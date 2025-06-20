import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UsuariosService from '../Services/UsuariosService';
import authService from '../services/IniciarSesion'; // Importa el servicio de autenticación
import './Home.css';

const Usuarios = () => {
        const [usuarios, setUsuarios] = useState([]);
        const [currentUsuarios, setCurrentUsuarios] = useState({
                id: 0,
      
                nombre: '',
            

                rolesId: null,
                contrasena: '',
                confirmarContrasena: '',
                token: '',

                nombre: '',
                telefono: '',
                email: '',
                apellidos: '',
                activo: ''

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
        }, []);

        const fetchUsuarios = async () => {
                setLoading(true);
                setError(null);
                try {
                        const data = await UsuariosService.getAll();
                        setUsuarios(Array.isArray(data) ? data : []);
                } catch (err) {
                        setError('Error al cargar los Usuarios');
                        console.error(err);
                        setUsuarios([]);
                } finally {
                        setLoading(false);
                }
        };

        const handleInputChange = (e) => {
                const { name, value } = e.target;
                setCurrentUsuarios({
                        ...currentUsuarios,
                        [name]: value
                });
        };

        const validateUsuarios = () => {
                const errors = [];
                if (!currentUsuarios.token || currentUsuarios.token.trim() === '') {
                        errors.push('El token es requerido');
                }
                if (!currentUsuarios.nombre || currentUsuarios.nombre.trim() === '') {
                        errors.push('El nombre es obligatorio');
                }
                if (!currentUsuarios.email || currentUsuarios.email.trim() === '') {
                        errors.push('El email es requerido');
                }
                return errors;
        };

        const handleSubmit = async (e) => {
                e.preventDefault();
                setError(null);
                setSuccess(null);

                const validationErrors = validateUsuarios();
                if (validationErrors.length > 0) {
                        setError(validationErrors.join(', '));
                        return;
                }

                setLoading(true);

                try {
                        if (isEditing) {
                                await UsuariosService.update(currentUsuarios);
                                setSuccess('Usuario actualizado exitosamente');
                        } else {
                                await UsuariosService.create(currentUsuarios);
                                setSuccess('Usuario creado exitosamente');
                        }
                        resetForm();
                        await fetchUsuarios();
                } catch (err) {
                        const errorMsg = err.response?.data?.message || 'Error al procesar la solicitud';
                        setError(errorMsg);
                        console.error(err);
                } finally {
                        setLoading(false);
                }
        };

        const Actualizar = (usuarios) => {
                setCurrentUsuarios(usuarios);
                setIsEditing(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        const Eliminar = async (id) => {
                if (!window.confirm('¿Está seguro de eliminar este Usuario?')) return;

                setLoading(true);
                try {
                        await UsuariosService.remove(id);
                        setSuccess('Usuario eliminado exitosamente');
                        await fetchUsuarios();
                } catch (err) {
                        setError('Error al eliminar el Usuario');
                        console.error(err);
                } finally {
                        setLoading(false);
                }
        };

        const resetForm = () => {
                setCurrentUsuarios({
                        id: 0,
                      
                        nombre: '',
                      

                        rolesId: null,
                        contrasena: '',
                        confirmarContrasena: '',
                        token: '',

                        nombre: '',
                        telefono: '',
                        email: '',
                        apellidos: '',
                        activo: ''
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
                        navigate('/login'); // Redirige a la página de inicio de sesión
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
                                                className={`menu-item ${isActive('/Usuarios') ? 'active' : ''}`}
                                                onClick={() => navigate('/Usuarios')}
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
                                                <h3 className="section-title">{isEditing ? 'Editar Régimen' : 'Nuevo Régimen'}</h3>
                                                <form onSubmit={handleSubmit}>
                                                        <div className="form-vertical">
                                                                <div className="form-group">
                                                                        <label htmlFor="codigo">Código</label>
                                                                        <input
                                                                                type="text"
                                                                                id="codigo"
                                                                                name="codigo"
                                                                                value={currentUsuarios.codigo}
                                                                                onChange={handleInputChange}
                                                                                required
                                                                        />
                                                                </div>
                                                                <div className="form-group">
                                                                        <label htmlFor="nombre">Nombre</label>
                                                                        <input
                                                                                type="text"
                                                                                id="nombre"
                                                                                name="nombre"
                                                                                value={currentUsuarios.nombre}
                                                                                onChange={handleInputChange}
                                                                                required
                                                                        />
                                                                </div>
                                                                <div className="form-group">
                                                                        <label htmlFor="descripcion">Descripción</label>
                                                                        <textarea
                                                                                id="descripcion"
                                                                                name="descripcion"
                                                                                value={currentUsuarios.descripcion}
                                                                                onChange={handleInputChange}
                                                                                required
                                                                        />
                                                                </div>
                                                        </div>
                                                        <div className="form-actions">
                                                                {isEditing && (
                                                                        <button
                                                                                type="button"
                                                                                className="button secondary"
                                                                                onClick={resetForm}
                                                                                disabled={loading}
                                                                        >
                                                                                Cancelar
                                                                        </button>
                                                                )}
                                                                <button
                                                                        type="submit"
                                                                        className="button primary"
                                                                        disabled={loading}
                                                                >
                                                                        {loading ? 'Procesando...' : (isEditing ? 'Actualizar' : 'Guardar')}
                                                                </button>
                                                        </div>
                                                </form>
                                        </div>

                                        {/* Listado */}
                                        <div className="list-section">
                                                <h3 className="section-title">Listado de Usuarios</h3>
                                                {loading ? (
                                                        <div className="loading-state">
                                                                <div className="spinner"></div>
                                                                <p>Cargando Usuarios...</p>
                                                        </div>
                                                ) : (!Array.isArray(usuarios) || usuarios.length === 0) ? (
                                                        <div className="empty-state">
                                                                <p>No hay Usuarios registrados</p>
                                                        </div>
                                                ) : (
                                                        <div className="table-container">
                                                                <table className="data-table">
                                                                        <thead>
                                                                                <tr>
                                                                                        <th>Código</th>
                                                                                        <th>Nombre</th>
                                                                                        <th>Descripción</th>
                                                                                        <th>Acciones</th>
                                                                                </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                                {usuarios.map((usuario) => (
                                                                                        <tr key={usuario.id}>
                                                                                                <td>{usuario.codigo}</td>
                                                                                                <td>{usuario.nombre}</td>
                                                                                                <td>
                                                                                                        {usuario.descripcion.length > 50
                                                                                                                ? `${usuario.descripcion.substring(0, 50)}...`
                                                                                                                : usuario.descripcion}
                                                                                                </td>
                                                                                                <td className="actions-cell">
                                                                                                        <button
                                                                                                                className="table-button edit"
                                                                                                                onClick={() => Actualizar(usuario)}
                                                                                                                disabled={loading}
                                                                                                        >
                                                                                                                Editar
                                                                                                        </button>
                                                                                                        <button
                                                                                                                className="table-button delete"
                                                                                                                onClick={() => Eliminar(usuario.id)}
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

