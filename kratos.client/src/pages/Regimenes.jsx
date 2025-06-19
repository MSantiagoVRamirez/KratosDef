import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RegimenTributarioService from '../Services/RegimenesTributariosService';
import authService from '../services/IniciarSesion';
import './Home.css';

const Regimenes = () => {
    const [regimenes, setRegimenes] = useState([]);
    const [currentRegimen, setCurrentRegimen] = useState({
        id: 0,
        codigo: '',
        nombre: '',
        descripcion: '',
        estado: true
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState({
        list: false,
        form: false,
        actions: false
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchRegimenes();
    }, []);

    const fetchRegimenes = async () => {
        setLoading(prev => ({ ...prev, list: true }));
        setError(null);
        try {
            const data = await RegimenTributarioService.getAll();
            setRegimenes(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Error al cargar los regímenes tributarios');
            console.error(err);
            setRegimenes([]);
        } finally {
            setLoading(prev => ({ ...prev, list: false }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentRegimen({
            ...currentRegimen,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateRegimen = () => {
        const errors = [];
        if (!currentRegimen.codigo || currentRegimen.codigo.trim() === '') {
            errors.push('El código es requerido');
        } else if (currentRegimen.codigo.length > 100) {
            errors.push('El código no debe exceder 100 caracteres');
        }

        if (!currentRegimen.nombre || currentRegimen.nombre.trim() === '') {
            errors.push('El nombre es obligatorio');
        } else if (currentRegimen.nombre.length > 100) {
            errors.push('El nombre no debe exceder 100 caracteres');
        }

        if (!currentRegimen.descripcion || currentRegimen.descripcion.trim() === '') {
            errors.push('La descripción es obligatoria');
        } else if (currentRegimen.descripcion.length > 100) {
            errors.push('La descripción no debe exceder 100 caracteres');
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const validationErrors = validateRegimen();
        if (validationErrors.length > 0) {
            setError(validationErrors.join(', '));
            return;
        }

        setLoading(prev => ({ ...prev, form: true }));

        try {
            if (isEditing) {
                await RegimenTributarioService.update(currentRegimen);
                setSuccess('Régimen tributario actualizado exitosamente');
            } else {
                await RegimenTributarioService.create(currentRegimen);
                setSuccess('Régimen tributario creado exitosamente');
            }
            resetForm();
            await fetchRegimenes();
        } catch (err) {
            const errorMsg = err.response?.data || err.message || 'Error al procesar la solicitud';
            setError(errorMsg);
            console.error(err);
        } finally {
            setLoading(prev => ({ ...prev, form: false }));
        }
    };

    const editRegimen = (regimen) => {
        setCurrentRegimen({
            id: regimen.id,
            codigo: regimen.codigo,
            nombre: regimen.nombre,
            descripcion: regimen.descripcion,
            estado: regimen.estado
        });
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const deleteRegimen = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar este régimen tributario?')) return;

        setLoading(prev => ({ ...prev, actions: true }));
        setError(null);
        try {
            await RegimenTributarioService.remove(id);
            setSuccess('Régimen tributario eliminado exitosamente');
            await fetchRegimenes();
        } catch (err) {
            setError('Error al eliminar el régimen tributario');
            console.error(err);
        } finally {
            setLoading(prev => ({ ...prev, actions: false }));
        }
    };

    const toggleRegimenStatus = async (id, currentStatus) => {
        if (!window.confirm(`¿Está seguro de ${currentStatus ? 'desactivar' : 'activar'} este régimen tributario?`)) return;

        setLoading(prev => ({ ...prev, actions: true }));
        setError(null);
        try {
            const regimenToUpdate = regimenes.find(r => r.id === id);
            if (!regimenToUpdate) {
                throw new Error('Régimen no encontrado');
            }

            const updatedRegimen = {
                ...regimenToUpdate,
                estado: !currentStatus
            };

            await RegimenTributarioService.update(updatedRegimen);
            setSuccess(`Régimen tributario ${currentStatus ? 'desactivado' : 'activado'} exitosamente`);
            await fetchRegimenes();
        } catch (err) {
            setError(`Error al ${currentStatus ? 'desactivar' : 'activar'} el régimen tributario`);
            console.error(err);
        } finally {
            setLoading(prev => ({ ...prev, actions: false }));
        }
    };

    const resetForm = () => {
        setCurrentRegimen({
            id: 0,
            codigo: '',
            nombre: '',
            descripcion: '',
            estado: true
        });
        setIsEditing(false);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleLogout = async () => {
        try {
            await authService.cerrarSesion();
            navigate('/login');
        } catch (error) {
            setError('Error al cerrar sesión');
            console.error(error);
        }
    };

    return (
        <div className="app-container">
            {/* Navbar Superior */}
            <nav className="app-navbar">
                <div className="navbar-left">
                    <button className="menu-button" onClick={toggleSidebar}>
                        <span className="menu-icon">≡</span>
                    </button>
                    <h1 className="navbar-title">Sistema Económico</h1>
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
                    <div
                        className={`menu-item ${isActive('/Home') ? 'active' : ''}`}
                        onClick={() => navigate('/Home')}
                    >
                        <span>Actividad Económica</span>
                    </div>
                    <div
                        className={`menu-item ${isActive('/Regimenes') ? 'active' : ''}`}
                        onClick={() => navigate('/Regimenes')}
                    >
                        <span>Regímenes Tributarios</span>
                    </div>
                    <div
                        className={`menu-item ${isActive('/TiposSociedad') ? 'active' : ''}`}
                        onClick={() => navigate('/TiposSociedad')}
                    >
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
                    <h2 className="page-title">Gestión de Regímenes Tributarios</h2>

                    {/* Alertas */}
                    <div className="alerts-container">
                        {error && (
                            <div className="alert error-alert">
                                {error}
                                <button className="alert-close" onClick={() => setError(null)}>×</button>
                            </div>
                        )}
                        {success && (
                            <div className="alert success-alert">
                                {success}
                                <button className="alert-close" onClick={() => setSuccess(null)}>×</button>
                            </div>
                        )}
                    </div>

                    {/* Formulario */}
                    <div className="form-section">
                        <h3 className="section-title">{isEditing ? 'Editar Régimen' : 'Nuevo Régimen'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-vertical">
                                <div className="form-group">
                                    <label htmlFor="codigo">Código *</label>
                                    <input
                                        type="text"
                                        id="codigo"
                                        name="codigo"
                                        value={currentRegimen.codigo}
                                        onChange={handleInputChange}
                                        required
                                        maxLength={100}
                                        disabled={isEditing}
                                        className={isEditing ? 'disabled-input' : ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre *</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={currentRegimen.nombre}
                                        onChange={handleInputChange}
                                        required
                                        maxLength={100}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="descripcion">Descripción *</label>
                                    <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        value={currentRegimen.descripcion}
                                        onChange={handleInputChange}
                                        required
                                        maxLength={100}
                                        rows="4"
                                    />
                                </div>
                                <div className="form-group checkbox-group">
                                    <label htmlFor="estado">Estado:</label>
                                    <input
                                        type="checkbox"
                                        id="estado"
                                        name="estado"
                                        checked={currentRegimen.estado}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                    <span className={!isEditing ? 'disabled-text' : ''}>
                                        {currentRegimen.estado ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>
                            </div>
                            <div className="form-actions">
                                {isEditing && (
                                    <button
                                        type="button"
                                        className="button secondary"
                                        onClick={resetForm}
                                        disabled={loading.form || loading.actions}
                                    >
                                        Cancelar
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="button primary"
                                    disabled={loading.form || loading.actions}
                                >
                                    {loading.form ? 'Procesando...' : (isEditing ? 'Actualizar' : 'Guardar')}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Listado */}
                    <div className="list-section">
                        <h3 className="section-title">Listado de Regímenes</h3>
                        {loading.list ? (
                            <div className="loading-state">
                                <div className="spinner"></div>
                                <p>Cargando regímenes...</p>
                            </div>
                        ) : (!Array.isArray(regimenes) || regimenes.length === 0) ? (
                            <div className="empty-state">
                                <p>No hay regímenes tributarios registrados</p>
                            </div>
                        ) : (
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Descripción</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {regimenes.map((regimen) => (
                                            <tr key={regimen.id} className={!regimen.estado ? 'inactive-row' : ''}>
                                                <td>{regimen.codigo}</td>
                                                <td>{regimen.nombre}</td>
                                                <td>
                                                    {regimen.descripcion.length > 50
                                                        ? `${regimen.descripcion.substring(0, 50)}...`
                                                        : regimen.descripcion}
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${regimen.estado ? 'active' : 'inactive'}`}>
                                                        {regimen.estado ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>
                                                <td className="actions-cell">
                                                    <button
                                                        className="table-button edit"
                                                        onClick={() => editRegimen(regimen)}
                                                        disabled={loading.actions}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className={`table-button ${regimen.estado ? 'deactivate' : 'activate'}`}
                                                        onClick={() => toggleRegimenStatus(regimen.id, regimen.estado)}
                                                        disabled={loading.actions}
                                                    >
                                                        {regimen.estado ? 'Desactivar' : 'Activar'}
                                                    </button>
                                                    <button
                                                        className="table-button delete"
                                                        onClick={() => deleteRegimen(regimen.id)}
                                                        disabled={loading.actions}
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

export default Regimenes;