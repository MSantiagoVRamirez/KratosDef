import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import empresaService from '../services/RegistroEmpresa';
import ActividadEconomicaService from '../services/actividadEconomicaServices';
import RegimenTributarioService from '../Services/RegimenesTributariosService';
import TiposSociedadesService from '../services/TiposSociedadesService';
import './Home.css';

const Empresas = () => {
    // Estados
    const [empresas, setEmpresas] = useState([]);
    const [currentEmpresa, setCurrentEmpresa] = useState({
        id: 0,
        razonSocial: '',
        nombreComercial: '',
        nit: '',
        dv: '',
        telefono: '',
        email: '',
        representanteLegal: '',
        token: '',
        tiposociedadId: null,
        actividadId: null,
        regimenId: null,
        contrasena: '',
        confirmarContrasena: '',
        activo: true,
        creadoEn: '',
        actualizadoEn: ''
    });
    const [tiposSociedad, setTiposSociedad] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [regimenes, setRegimenes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    // Efectos
    useEffect(() => {
        fetchEmpresas();
        fetchDropdownData();
    }, []);

    // Funciones
    const fetchEmpresas = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await empresaService.listarEmpresas();
            setEmpresas(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Error al cargar las empresas');
            console.error(err);
            setEmpresas([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchDropdownData = async () => {
        try {
            const [sociedadesRes, actividadesRes, regimenesRes] = await Promise.all([
                TiposSociedadesService.getAll(),
                ActividadEconomicaService.getAll(),
                RegimenTributarioService.getAll()
            ]);
            setTiposSociedad(sociedadesRes);
            setActividades(actividadesRes);
            setRegimenes(regimenesRes);
        } catch (err) {
            setError('Error al cargar los datos necesarios');
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentEmpresa(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setCurrentEmpresa(prev => ({
            ...prev,
            [name]: value ? Number(value) : null
        }));
    };

    const validateForm = () => {
        const errors = [];
        const {
            razonSocial,
            nombreComercial,
            nit,
            contrasena,
            confirmarContrasena,
            email,
            telefono,
            representanteLegal,
            tiposociedadId,
            actividadId,
            regimenId,
            token
        } = currentEmpresa;

        // Validaciones requeridas
        if (!razonSocial?.trim()) errors.push('Razón social es requerida');
        if (!nombreComercial?.trim()) errors.push('Nombre comercial es obligatorio');
        if (!nit?.trim()) errors.push('NIT es obligatorio');
        if (!telefono?.trim()) errors.push('Teléfono es obligatorio');
        if (!representanteLegal?.trim()) errors.push('Representante legal es obligatorio');
        if (!token?.trim()) errors.push('Token de seguridad es obligatorio');
        if (!tiposociedadId) errors.push('Tipo de sociedad es requerido');
        if (!actividadId) errors.push('Actividad económica es requerida');
        if (!regimenId) errors.push('Régimen tributario es requerido');

        // Validar email si está presente
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('El email no tiene un formato válido');
        }

        // Validar contraseñas para registro o cambio
        if (!isEditing || contrasena) {
            if (!contrasena) {
                errors.push('Contraseña es requerida');
            } else {
                if (contrasena.length < 8) errors.push('La contraseña debe tener al menos 8 caracteres');
                if (!/[A-Z]/.test(contrasena)) errors.push('La contraseña debe contener al menos una mayúscula');
                if (!/[0-9]/.test(contrasena)) errors.push('La contraseña debe contener al menos un número');
            }

            if (contrasena !== confirmarContrasena) {
                errors.push('Las contraseñas no coinciden');
            }
        }

        return errors;
    };
    const handleRegister = async () => {
        setLoading(true);
        setError(null);

        try {
            // Preparar los datos como en el componente Register
            const empresaData = {
                ...currentEmpresa,
                contrasena: currentEmpresa.contrasena,
                confirmarContrasena: currentEmpresa.contrasena // Asegurar que coincidan
            };

            // Eliminar campos que no deben enviarse
            delete empresaData.id;
            delete empresaData.creadoEn;
            delete empresaData.actualizadoEn;

            await empresaService.registroEmpresa(empresaData);

            setSuccess('Empresa registrada correctamente');
            resetForm();
            await fetchEmpresas();
        } catch (err) {
            // Mejor manejo de errores
            if (err.response?.data?.errors) {
                const errorMessages = Object.values(err.response.data.errors).flat();
                setError(errorMessages.join(', '));
            } else {
                setError(err.message || 'Error al registrar la empresa');
            }
        } finally {
            setLoading(false);
        }
    };
    const handleUpdate = async () => {
        setLoading(true);
        setError(null);

        try {
            // Preparar los datos para actualización
            const empresaData = {
                ...currentEmpresa,
                // Solo enviar contraseña si se modificó
                contrasena: currentEmpresa.contrasena || undefined,
                confirmarContrasena: currentEmpresa.contrasena || undefined
            };

            await empresaService.actualizarEmpresa(empresaData);

            setSuccess('Empresa actualizada correctamente');
            resetForm();
            await fetchEmpresas();
        } catch (err) {
            if (err.response?.data?.errors) {
                const errorMessages = Object.values(err.response.data.errors).flat();
                setError(errorMessages.join(', '));
            } else {
                setError(err.message || 'Error al actualizar la empresa');
            }
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        if (errors.length > 0) {
            setError(errors.join(', '));
            return;
        }

        if (isEditing) {
            await handleUpdate();
        } else {
            await handleRegister();
        }
    };

    const editEmpresa = (empresa) => {
        setCurrentEmpresa({
            ...empresa,
            contrasena: '',
            confirmarContrasena: ''
        });
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const deleteEmpresa = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar esta empresa?')) return;

        setLoading(true);
        try {
            await empresaService.eliminarEmpresa(id);
            setSuccess('Empresa eliminada correctamente');
            await fetchEmpresas();
        } catch (err) {
            setError(err.message || 'Error al eliminar la empresa');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setCurrentEmpresa({
            id: 0,
            razonSocial: '',
            nombreComercial: '',
            nit: '',
            dv: '',
            telefono: '',
            email: '',
            representanteLegal: '',
            token: '',
            tiposociedadId: null,
            actividadId: null,
            regimenId: null,
            contrasena: '',
            confirmarContrasena: '',
            activo: true,
            creadoEn: '',
            actualizadoEn: ''
        });
        setIsEditing(false);
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const isActive = (path) => location.pathname === path;
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="app-container">
            {/* Navbar Superior */}
            <nav className="app-navbar">
                <div className="navbar-left">
                    <button className="menu-button" onClick={toggleSidebar}>
                        <span className="menu-icon">≡</span>
                    </button>
                    <h1 className="navbar-title">Sistema de Empresas</h1>
                </div>
                <div className="navbar-right">
                    <div className="user-menu">
                        <span className="user-avatar">US</span>
                        <button className="logout-button" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-menu">
                    <div className={`menu-item ${isActive('/Home') && 'active'}`} onClick={() => navigate('/Home')}>
                        <span>Actividad Económica</span>
                    </div>
                    <div className={`menu-item ${isActive('/Regimenes') && 'active'}`} onClick={() => navigate('/Regimenes')}>
                        <span>Regímenes Tributarios</span>
                    </div>
                    <div className={`menu-item ${isActive('/TiposSociedad') && 'active'}`} onClick={() => navigate('/TiposSociedad')}>
                        <span>Tipos de Sociedad</span>
                    </div>
                    <div
                        className={`menu-item ${isActive('/Empresa') ? 'active' : ''}`}
                        onClick={() => navigate('/Empresa')}
                    >
                        <span>Empresas</span>
                    </div>
                    <div
                        className={`menu-item ${isActive('/Usuarios') ? 'active' : ''}`}
                        onClick={() => navigate('/Usuarios')}
                    >
                        <span>Usuarios</span>
                    </div>
                </div>
            </aside>

            {/* Contenido Principal */}
            <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <div className="content-container">
                    <h2 className="page-title">Gestión de Empresas</h2>

                    {/* Alertas */}
                    {error && (
                        <div className="alert error-alert">
                            {error}
                            <button onClick={() => setError(null)} className="alert-close">×</button>
                        </div>
                    )}
                    {success && (
                        <div className="alert success-alert">
                            {success}
                            <button onClick={() => setSuccess(null)} className="alert-close">×</button>
                        </div>
                    )}

                    {/* Formulario */}
                    <div className="form-section">
                        <h3>{isEditing ? 'Editar Empresa' : 'Nueva Empresa'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Razón Social*</label>
                                    <input
                                        type="text"
                                        name="razonSocial"
                                        value={currentEmpresa.razonSocial}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nombre Comercial*</label>
                                    <input
                                        type="text"
                                        name="nombreComercial"
                                        value={currentEmpresa.nombreComercial}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>NIT*</label>
                                    <input
                                        type="text"
                                        name="nit"
                                        value={currentEmpresa.nit}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>DV</label>
                                    <input
                                        type="text"
                                        name="dv"
                                        value={currentEmpresa.dv}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Teléfono</label>
                                    <input
                                        type="text"
                                        name="telefono"
                                        value={currentEmpresa.telefono}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={currentEmpresa.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Representante Legal</label>
                                    <input
                                        type="text"
                                        name="representanteLegal"
                                        value={currentEmpresa.representanteLegal}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Token</label>
                                    <input
                                        type="text"
                                        name="token"
                                        value={currentEmpresa.token}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tipo de Sociedad*</label>
                                    <select
                                        name="tiposociedadId"
                                        value={currentEmpresa.tiposociedadId || ''}
                                        onChange={handleSelectChange}
                                        required
                                    >
                                        <option value="">Seleccione...</option>
                                        {tiposSociedad.map(tipo => (
                                            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Actividad Económica*</label>
                                    <select
                                        name="actividadId"
                                        value={currentEmpresa.actividadId || ''}
                                        onChange={handleSelectChange}
                                        required
                                    >
                                        <option value="">Seleccione...</option>
                                        {actividades.map(act => (
                                            <option key={act.id} value={act.id}>{act.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Régimen Tributario*</label>
                                    <select
                                        name="regimenId"
                                        value={currentEmpresa.regimenId || ''}
                                        onChange={handleSelectChange}
                                        required
                                    >
                                        <option value="">Seleccione...</option>
                                        {regimenes.map(reg => (
                                            <option key={reg.id} value={reg.id}>{reg.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Estado</label>
                                    <select
                                        name="activo"
                                        value={currentEmpresa.activo}
                                        onChange={(e) => setCurrentEmpresa(prev => ({
                                            ...prev,
                                            activo: e.target.value === 'true'
                                        }))}
                                    >
                                        <option value={true}>Activo</option>
                                        <option value={false}>Inactivo</option>
                                    </select>
                                </div>

                                {/* Campos de contraseña solo para nuevo registro */}
                                {!isEditing && (
                                    <>
                                        <div className="form-group">
                                            <label>Contraseña*</label>
                                            <input
                                                type="password"
                                                name="contrasena"
                                                value={currentEmpresa.contrasena}
                                                onChange={handleInputChange}
                                                required
                                                minLength="8"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Confirmar Contraseña*</label>
                                            <input
                                                type="password"
                                                name="confirmarContrasena"
                                                value={currentEmpresa.confirmarContrasena}
                                                onChange={handleInputChange}
                                                required
                                                minLength="8"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Campos de contraseña para edición (opcional) */}
                                {isEditing && (
                                    <>
                                        <div className="form-group">
                                            <label>Nueva Contraseña (dejar en blanco para no cambiar)</label>
                                            <input
                                                type="password"
                                                name="contrasena"
                                                value={currentEmpresa.contrasena}
                                                onChange={handleInputChange}
                                                placeholder="Nueva contraseña"
                                                minLength="8"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Confirmar Nueva Contraseña</label>
                                            <input
                                                type="password"
                                                name="confirmarContrasena"
                                                value={currentEmpresa.confirmarContrasena}
                                                onChange={handleInputChange}
                                                placeholder="Confirmar nueva contraseña"
                                                minLength="8"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Campos de solo lectura para fechas en edición */}
                                {isEditing && (
                                    <>
                                        <div className="form-group">
                                            <label>Fecha de Creación</label>
                                            <input
                                                type="text"
                                                value={new Date(currentEmpresa.creadoEn).toLocaleString()}
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Última Actualización</label>
                                            <input
                                                type="text"
                                                value={new Date(currentEmpresa.actualizadoEn).toLocaleString()}
                                                readOnly
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="form-actions">
                                {isEditing && (
                                    <button type="button" onClick={resetForm} className="button secondary">
                                        Cancelar
                                    </button>
                                )}
                                <button type="submit" className="button primary" disabled={loading}>
                                    {loading ? 'Procesando...' : isEditing ? 'Actualizar' : 'Registrar'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Listado de Empresas */}
                    <div className="list-section">
                        <h3>Listado de Empresas</h3>
                        {loading ? (
                            <div className="loading-state">Cargando...</div>
                        ) : empresas.length === 0 ? (
                            <div className="empty-state">No hay empresas registradas</div>
                        ) : (
                            <div className="table-responsive">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Razón Social</th>
                                            <th>Nombre Comercial</th>
                                            <th>NIT</th>
                                            <th>DV</th>
                                            <th>Teléfono</th>
                                            <th>Email</th>
                                            <th>Representante Legal</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {empresas.map(empresa => (
                                            <tr key={empresa.id}>
                                                <td>{empresa.id}</td>
                                                <td>{empresa.razonSocial}</td>
                                                <td>{empresa.nombreComercial}</td>
                                                <td>{empresa.nit}</td>
                                                <td>{empresa.dv}</td>
                                                <td>{empresa.telefono}</td>
                                                <td>{empresa.email}</td>
                                                <td>{empresa.representanteLegal}</td>
                                                <td>
                                                    <span className={`status-badge ${empresa.activo ? 'active' : 'inactive'}`}>
                                                        {empresa.activo ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>
                                                <td className="actions">
                                                    <button
                                                        onClick={() => editEmpresa(empresa)}
                                                        className="action-btn edit"
                                                        disabled={loading}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => deleteEmpresa(empresa.id)}
                                                        className="action-btn delete"
                                                        disabled={loading}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Empresas;