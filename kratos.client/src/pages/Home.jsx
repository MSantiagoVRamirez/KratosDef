import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ActividadEconomicaService from '../services/actividadEconomicaServices';
import './Home.css';

const Home = () => {
    const [actividades, setActividades] = useState([]);
    const [currentActividad, setCurrentActividad] = useState({
        id: 0,
        codigoCiiu: '',
        nombre: '',
        descripcion: '',
        categoria: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchActividades();
    }, []);

    const fetchActividades = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ActividadEconomicaService.getAll();
            setActividades(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Error al cargar las actividades económicas');
            console.error(err);
            setActividades([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentActividad({
            ...currentActividad,
            [name]: name === 'codigoCiiu' ? value.toString() : value
        });
    };

    const validateActividad = () => {
        const errors = [];
        if (!currentActividad.codigoCiiu || currentActividad.codigoCiiu <= '') {
            errors.push('El código CIIU es requerido');
        }
        if (!currentActividad.nombre || currentActividad.nombre.trim() === '') {
            errors.push('El nombre es obligatorio');
        }
        if (!currentActividad.descripcion || currentActividad.descripcion.trim() === '') {
            errors.push('La descripción es obligatoria');
        }
        if (!currentActividad.categoria || currentActividad.categoria.trim() === '') {
            errors.push('La categoría es obligatoria');
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const validationErrors = validateActividad();
        if (validationErrors.length > 0) {
            setError(validationErrors.join(', '));
            return;
        }

        setLoading(true);

        try {
            if (isEditing) {
                await ActividadEconomicaService.update(currentActividad);
                setSuccess('Actividad económica actualizada exitosamente');
            } else {
                await ActividadEconomicaService.create(currentActividad);
                setSuccess('Actividad económica creada exitosamente');
            }
            resetForm();
            await fetchActividades();
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al procesar la solicitud';
            setError(errorMsg);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const editActividad = (actividad) => {
        setCurrentActividad(actividad);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const deleteActividad = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar esta actividad económica?')) return;

        setLoading(true);
        try {
            await ActividadEconomicaService.remove(id);
            setSuccess('Actividad económica eliminada exitosamente');
            await fetchActividades();
        } catch (err) {
            setError('Error al eliminar la actividad económica');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setCurrentActividad({
            id: 0,
            codigoCiiu: '',
            nombre: '',
            descripcion: '',
            categoria: ''
        });
        setIsEditing(false);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const isActive = (path) => {
        return location.pathname === path;
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
                  
                </div>
            </aside>

            {/* Contenido Principal */}
            <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <div className="content-container">
                    <h2 className="page-title">Gestión de Actividades Económicas</h2>

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
                        <h3 className="section-title">{isEditing ? 'Editar Actividad' : 'Nueva Actividad'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-vertical">
                                <div className="form-group">
                                    <label htmlFor="codigoCiiu">Código CIIU</label>
                                    <input
                                        type="text"
                                        id="codigoCiiu"
                                        name="codigoCiiu"
                                        value={currentActividad.codigoCiiu}
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
                                        value={currentActividad.nombre}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="categoria">Categoría</label>
                                    <input
                                        type="text"
                                        id="categoria"
                                        name="categoria"
                                        value={currentActividad.categoria}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="descripcion">Descripción</label>
                                    <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        value={currentActividad.descripcion}
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
                        <h3 className="section-title">Listado de Actividades</h3>
                        {loading ? (
                            <div className="loading-state">
                                <div className="spinner"></div>
                                <p>Cargando actividades...</p>
                            </div>
                        ) : (!Array.isArray(actividades) || actividades.length === 0) ? (
                            <div className="empty-state">
                                <p>No hay actividades económicas registradas</p>
                            </div>
                        ) : (
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Categoría</th>
                                            <th>Descripción</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {actividades.map((actividad) => (
                                            <tr key={actividad.id}>
                                                <td>{actividad.codigoCiiu}</td>
                                                <td>{actividad.nombre}</td>
                                                <td>{actividad.categoria}</td>
                                                <td>
                                                    {actividad.descripcion.length > 50
                                                        ? `${actividad.descripcion.substring(0, 50)}...`
                                                        : actividad.descripcion}
                                                </td>
                                                <td className="actions-cell">
                                                    <button
                                                        className="table-button edit"
                                                        onClick={() => editActividad(actividad)}
                                                        disabled={loading}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="table-button delete"
                                                        onClick={() => deleteActividad(actividad.id)}
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

export default Home;
