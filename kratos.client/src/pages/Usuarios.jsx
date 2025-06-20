import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UsuariosService from '../Services/UsuariosService';
import RolesService from '../Services/RolesServices';
import authService from '../services/IniciarSesion';
import './Home.css';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]); // Nuevo estado para roles
    const [currentUsuario, setCurrentUsuario] = useState({
        id: 0,
        nombres: '', // Asegurar que coincide con el backend
        apellidos: '',
        rolesId: null,
        contrasena: '',
        confirmarContrasena: '',
        token: '',
        telefono: '',
        email: '',
        estado: true
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchUsuarios();
        fetchRoles(); // Nueva función para cargar roles
    }, []);

    const fetchUsuarios = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await UsuariosService.getAll();
            setUsuarios(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Error al cargar los usuarios');
            console.error(err);
            setUsuarios([]);
        } finally {
            setLoading(false);
        }
    };

    // Nueva función para cargar roles
    const fetchRoles = async () => {
        try {
            const data = await RolesService.getAll();
            setRoles(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error al cargar roles:', err);
            setError('Error al cargar los roles');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUsuario({
            ...currentUsuario,
            [name]: value
        });
    };

    const validateUsuario = () => {
        const errors = [];
        const { nombres, apellidos, email, telefono, token, contrasena, confirmarContrasena, rolesId } = currentUsuario;

        if (!nombres.trim()) errors.push('El nombre es obligatorio');
        if (!apellidos.trim()) errors.push('Los apellidos son obligatorios');
        if (!email.trim()) errors.push('El email es requerido');
        if (!telefono.trim()) errors.push('El teléfono es requerido');
        if (!token.trim()) errors.push('El token es requerido');
        if (!rolesId) errors.push('El rol es requerido');

        if (!isEditing || contrasena) {
            if (!contrasena) {
                errors.push('La contraseña es requerida');
            } else if (contrasena.length < 8) {
                errors.push('La contraseña debe tener al menos 8 caracteres');
            }

            if (contrasena !== confirmarContrasena) {
                errors.push('Las contraseñas no coinciden');
            }
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const validationErrors = validateUsuario();
        if (validationErrors.length > 0) {
            setError(validationErrors.join(', '));
            return;
        }

        setLoading(true);

        try {
            const usuarioData = {
                ...currentUsuario,
                estado: currentUsuario.estado
            };

          

            if (isEditing) {
                await UsuariosService.update(usuarioData);
                setSuccess('Usuario actualizado exitosamente');
            } else {
                await UsuariosService.create(usuarioData);
                setSuccess('Usuario creado exitosamente');
            }

            resetForm();
            await fetchUsuarios();
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.response?.data?.title || 'Error al procesar la solicitud';
            setError(errorMsg);
            console.error(err);

            // Mostrar errores de validación detallados si existen
            if (err.response?.data?.errors) {
                const validationErrors = Object.values(err.response.data.errors).flat();
                setError(validationErrors.join(', '));
            }
        } finally {
            setLoading(false);
        }
    };

    const Actualizar = (usuario) => {
        setCurrentUsuario(usuario);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const Eliminar = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar este usuario?')) return;

        setLoading(true);
        try {
            await UsuariosService.remove(id);
            setSuccess('Usuario eliminado exitosamente');
            await fetchUsuarios();
        } catch (err) {
            setError('Error al eliminar el usuario');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setCurrentUsuario({
            id: 0,
            nombres: '',
            apellidos: '',
            rolesId: null,
            contrasena: '',
            confirmarContrasena: '',
            token: '',
            telefono: '',
            email: '',
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
                    <div className={`menu-item ${isActive('/Dashboard') ? 'active' : ''}`}
                        onClick={() => navigate('/Dashboard')}>
                        <span>Dashboard</span>
                    </div>
                    <div className={`menu-item ${isActive('/Home') ? 'active' : ''}`}
                        onClick={() => navigate('/Home')}>
                        <span>Actividad Económica</span>
                    </div>
                    <div className={`menu-item ${isActive('/Regimenes') ? 'active' : ''}`}
                        onClick={() => navigate('/Regimenes')}>
                        <span>Regímenes Tributarios</span>
                    </div>
                    <div className={`menu-item ${isActive('/TiposSociedad') ? 'active' : ''}`}
                        onClick={() => navigate('/TiposSociedad')}>
                        <span>Tipos de Sociedad</span>
                    </div>
                    <div className={`menu-item ${isActive('/Empresa') ? 'active' : ''}`}
                        onClick={() => navigate('/Empresa')}>
                        <span>Empresas</span>
                    </div>
                    <div className={`menu-item ${isActive('/Usuarios') ? 'active' : ''}`}
                        onClick={() => navigate('/Usuarios')}>
                        <span>Usuarios</span>
                    </div>
                </div>
            </aside>

            {/* Contenido Principal */}
            <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <div className="content-container">
                    <h2 className="page-title">Gestión de Usuarios</h2>

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
                        <h3 className="section-title">{isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Nombre*</label>
                                    <input
                                        type="text"
                                        name="nombres"
                                        value={currentUsuario.nombres}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Apellidos*</label>
                                    <input
                                        type="text"
                                        name="apellidos"
                                        value={currentUsuario.apellidos}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email*</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={currentUsuario.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Teléfono*</label>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        value={currentUsuario.telefono}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Token*</label>
                                    <input
                                        type="text"
                                        name="token"
                                        value={currentUsuario.token}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Rol*</label>
                                    <select
                                        name="rolesId"
                                        value={currentUsuario.rolesId || ''}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Seleccione un rol</option>
                                        {roles.map(rol => (
                                            <option key={rol.id} value={rol.id}>
                                                {rol.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Estado</label>
                                    <select
                                        name="estado"
                                        value={currentUsuario.estado}
                                        onChange={(e) => setCurrentUsuario({
                                            ...currentUsuario,
                                            estado: e.target.value === 'true'
                                        })}
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
                                                value={currentUsuario.contrasena}
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
                                                value={currentUsuario.confirmarContrasena}
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
                                            <label>Nueva Contraseña</label>
                                            <input
                                                type="password"
                                                name="contrasena"
                                                value={currentUsuario.contrasena}
                                                onChange={handleInputChange}
                                                placeholder="Dejar en blanco para no cambiar"
                                                minLength="8"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Confirmar Nueva Contraseña</label>
                                            <input
                                                type="password"
                                                name="confirmarContrasena"
                                                value={currentUsuario.confirmarContrasena}
                                                onChange={handleInputChange}
                                                placeholder="Confirmar nueva contraseña"
                                                minLength="8"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="form-actions">
                                {isEditing && (
                                    <button type="button" className="button secondary" onClick={resetForm}>
                                        Cancelar
                                    </button>
                                )}
                                <button type="submit" className="button primary" disabled={loading}>
                                    {loading ? 'Procesando...' : isEditing ? 'Actualizar' : 'Guardar'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Listado de Usuarios */}
                    <div className="list-section">
                        <h3 className="section-title">Listado de Usuarios</h3>
                        {loading ? (
                            <div className="loading-state">
                                <div className="spinner"></div>
                                <p>Cargando usuarios...</p>
                            </div>
                        ) : usuarios.length === 0 ? (
                            <div className="empty-state">
                                <p>No hay usuarios registrados</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Apellidos</th>
                                            <th>Email</th>
                                            <th>Teléfono</th>
                                            <th>Rol</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuarios.map((usuario) => (
                                            <tr key={usuario.id}>
                                                <td>{usuario.id}</td>
                                                <td>{usuario.nombres}</td>
                                                <td>{usuario.apellidos}</td>
                                                <td>{usuario.email}</td>
                                                <td>{usuario.telefono}</td>
                                                <td>
                                                    {roles.find(r => r.id === usuario.rolesId)?.nombre || 'Sin rol'}
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${usuario.estado ? 'active' : 'inactive'}`}>
                                                        {usuario.estado ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>
                                                <td className="actions">
                                                    <button
                                                        onClick={() => Actualizar(usuario)}
                                                        className="action-btn edit"
                                                        disabled={loading}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => Eliminar(usuario.id)}
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

export default Usuarios;
