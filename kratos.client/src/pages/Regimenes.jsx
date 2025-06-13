import { useState, useEffect } from 'react';
import RegimenTributarioService from '../services/RegimenesTributariosService';
import './Home.css';

const Regimenes = () => {
    const [regimenes, setRegimenes] = useState([]);
    const [currentRegimen, setCurrentRegimen] = useState({
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
        fetchRegimenes();
    }, []);

    const fetchRegimenes = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await RegimenTributarioService.getAll();
            setRegimenes(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Error al cargar los regímenes tributarios');
            console.error(err);
            setRegimenes([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentRegimen({
            ...currentRegimen,
            [name]: value
        });
    };

    const validateRegimen = () => {
        const errors = [];
        if (!currentRegimen.codigo || currentRegimen.codigo.trim() === '') {
            errors.push('El código es requerido');
        }
        if (!currentRegimen.nombre || currentRegimen.nombre.trim() === '') {
            errors.push('El nombre es obligatorio');
        }
        if (!currentRegimen.descripcion || currentRegimen.descripcion.trim() === '') {
            errors.push('La descripción es obligatoria');
        }
        if (!currentRegimen.tipo || currentRegimen.tipo.trim() === '') {
            errors.push('El tipo es obligatorio');
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

        setLoading(true);

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
            const errorMsg = err.response?.data?.message || 'Error al procesar la solicitud';
            setError(errorMsg);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const editRegimen = (regimen) => {
        setCurrentRegimen(regimen);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const deleteRegimen = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar este régimen tributario?')) return;

        setLoading(true);
        try {
            await RegimenTributarioService.remove(id);
            setSuccess('Régimen tributario eliminado exitosamente');
            await fetchRegimenes();
        } catch (err) {
            setError('Error al eliminar el régimen tributario');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setCurrentRegimen({
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
                        <span>Regímenes</span>
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
                                    <label htmlFor="codigo">Código</label>
                                    <input
                                        type="text"
                                        id="codigo"
                                        name="codigo"
                                        value={currentRegimen.codigo}
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
                                        value={currentRegimen.nombre}
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
                                        value={currentRegimen.tipo}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="descripcion">Descripción</label>
                                    <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        value={currentRegimen.descripcion}
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
                        <h3 className="section-title">Listado de Regímenes</h3>
                        {loading ? (
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
                                            <th>Tipo</th>
                                            <th>Descripción</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {regimenes.map((regimen) => (
                                            <tr key={regimen.id}>
                                                <td>{regimen.codigo}</td>
                                                <td>{regimen.nombre}</td>
                                                <td>{regimen.tipo}</td>
                                                <td>
                                                    {regimen.descripcion.length > 50
                                                        ? `${regimen.descripcion.substring(0, 50)}...`
                                                        : regimen.descripcion}
                                                </td>
                                                <td className="actions-cell">
                                                    <button
                                                        className="table-button edit"
                                                        onClick={() => editRegimen(regimen)}
                                                        disabled={loading}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="table-button delete"
                                                        onClick={() => deleteRegimen(regimen.id)}
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

export default Regimenes;
