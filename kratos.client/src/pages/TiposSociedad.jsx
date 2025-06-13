
import { useState, useEffect } from 'react';
import TiposSociedadesService from '../services/TiposSociedadesService';
import './Home.css';

const TiposSociedades = () => {
    const [tiposSociedades, setTiposSociedades] = useState([]);
    const [currentSociedad, setCurrentSociedad] = useState({
        id: 0,
        codigo: '',
        nombre: '',
        descripcion: '',
        tipo: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        fetchTiposSociedades();
    }, []);

    const fetchTiposSociedades = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await TiposSociedadesService.getAll();
            setTiposSociedades(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Error al cargar los tipos de sociedades');
            console.error(err);
            setTiposSociedades([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentSociedad({
            ...currentSociedad,
            [name]: value
        });
    };

    const validateSociedad = () => {
        const errors = [];
        if (!currentSociedad.codigo || currentSociedad.codigo.trim() === '') {
            errors.push('El código es requerido');
        }
        if (!currentSociedad.nombre || currentSociedad.nombre.trim() === '') {
            errors.push('El nombre es obligatorio');
        }
        if (!currentSociedad.descripcion || currentSociedad.descripcion.trim() === '') {
            errors.push('La descripción es obligatoria');
        }
        if (!currentSociedad.tipo || currentSociedad.tipo.trim() === '') {
            errors.push('El tipo es obligatorio');
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const validationErrors = validateSociedad();
        if (validationErrors.length > 0) {
            setError(validationErrors.join(', '));
            return;
        }

        setLoading(true);

        try {
            if (isEditing) {
                await TiposSociedadesService.update(currentSociedad);
                setSuccess('Tipo de sociedad actualizado exitosamente');
            } else {
                await TiposSociedadesService.create(currentSociedad);
                setSuccess('Tipo de sociedad creado exitosamente');
            }
            resetForm();
            await fetchTiposSociedades();
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al procesar la solicitud';
            setError(errorMsg);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const editSociedad = (sociedad) => {
        setCurrentSociedad(sociedad);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const deleteSociedad = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar este tipo de sociedad?')) return;

        setLoading(true);
        try {
            await TiposSociedadesService.remove(id);
            setSuccess('Tipo de sociedad eliminado exitosamente');
            await fetchTiposSociedades();
        } catch (err) {
            setError('Error al eliminar el tipo de sociedad');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setCurrentSociedad({
            id: 0,
            codigo: '',
            nombre: '',
            descripcion: '',
            tipo: ''
        });
        setIsEditing(false);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
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
                    <div className="menu-item active">
                        <span>Inicio</span>
                    </div>
                    <div className="menu-item">
                        <span>Tipos de Sociedades</span>
                    </div>
                    <div className="menu-item">
                        <span>Clientes</span>
                    </div>
                    <div className="menu-item">
                        <span>Reportes</span>
                    </div>
                    <div className="menu-item">
                        <span>Configuración</span>
                    </div>
                </div>
            </aside>

            {/* Contenido Principal */}
            <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <div className="content-container">
                    <h2 className="page-title">Gestión de Tipos de Sociedades</h2>

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
                        <h3 className="section-title">{isEditing ? 'Editar Tipo de Sociedad' : 'Nuevo Tipo de Sociedad'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-vertical">
                                <div className="form-group">
                                    <label htmlFor="codigo">Código</label>
                                    <input
                                        type="text"
                                        id="codigo"
                                        name="codigo"
                                        value={currentSociedad.codigo}
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
                                        value={currentSociedad.nombre}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tipo">Tipo</label>
                                    <input
                                        type="text"
                                        id="tipo"
                                        name="tipo"
                                        value={currentSociedad.tipo}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="descripcion">Descripción</label>
                                    <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        value={currentSociedad.descripcion}
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
                        <h3 className="section-title">Listado de Tipos de Sociedades</h3>
                        {loading ? (
                            <div className="loading-state">
                                <div className="spinner"></div>
                                <p>Cargando tipos de sociedades...</p>
                            </div>
                        ) : (!Array.isArray(tiposSociedades) || tiposSociedades.length === 0) ? (
                            <div className="empty-state">
                                <p>No hay tipos de sociedades registrados</p>
                            </div>
                        ) : (
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Tipo</th>
                                            <th>Descripción</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tiposSociedades.map((sociedad) => (
                                            <tr key={sociedad.id}>
                                                <td>{sociedad.codigo}</td>
                                                <td>{sociedad.nombre}</td>
                                                <td>{sociedad.tipo}</td>
                                                <td>
                                                    {sociedad.descripcion.length > 50
                                                        ? `${sociedad.descripcion.substring(0, 50)}...`
                                                        : sociedad.descripcion}
                                                </td>
                                                <td className="actions-cell">
                                                    <button
                                                        className="table-button edit"
                                                        onClick={() => editSociedad(sociedad)}
                                                        disabled={loading}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="table-button delete"
                                                        onClick={() => deleteSociedad(sociedad.id)}
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

export default TiposSociedades;
