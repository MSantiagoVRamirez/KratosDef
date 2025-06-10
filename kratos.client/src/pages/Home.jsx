
import { useState, useEffect } from 'react';
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
        [name]: name === 'codigoCiiu' ? value.toString() : value // Convertir a string
    });
};

    const validateActividad = (actividad) => {
        if (!actividad.codigoCiiu || actividad.codigoCiiu <= '') return 'El código CIIU debe tener valores';
        if (!actividad.nombre || actividad.nombre.trim() === '') return 'El nombre es obligatorio';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const validationError = validateActividad(currentActividad);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        try {
            if (isEditing) {
                await ActividadEconomicaService.update(currentActividad);
            } else {
                await ActividadEconomicaService.create(currentActividad);
            }
            resetForm();
            await fetchActividades();
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(`Error: ${err.response.data.message}`);
            } else {
                setError('Error al guardar la actividad económica');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const editActividad = (actividad) => {
        setCurrentActividad(actividad);
        setIsEditing(true);
    };

    const deleteActividad = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta actividad económica?')) {
            setLoading(true);
            try {
                await ActividadEconomicaService.remove(id);
                await fetchActividades();
            } catch (err) {
                setError('Error al eliminar la actividad económica');
                console.error(err);
            } finally {
                setLoading(false);
            }
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

    return (
        <div>
            <h2 className="text-center">Gestión de Actividades Económicas</h2>
                 <div className="hero-buttons">
                        <Link to="/Inicio" className="btn btn-primary">volver </Link>
                  
                      </div>
            <div className="container">
                <div className="content-wrapper">
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    {loading && <div className="text-center">Cargando...</div>}

                    <div className="row">
                        <div className="col-md-6 form-section">
                            <h4 className="text-center">{isEditing ? 'Editar Actividad' : 'Nueva Actividad'}</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Código CIIU</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="codigoCiiu"
                                        value={currentActividad.codigoCiiu}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        value={currentActividad.nombre}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Descripción</label>
                                    <textarea
                                        className="form-control"
                                        name="descripcion"
                                        value={currentActividad.descripcion}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Categoría</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="categoria"
                                        value={currentActividad.categoria}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {isEditing ? 'Actualizar' : 'Guardar'}
                                    </button>
                                    {isEditing && (
                                        <button type="button" className="btn btn-secondary" onClick={resetForm} disabled={loading}>
                                            Cancelar
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="col-md-6 list-section">
                            <h4 className="text-center">Lista de Actividades Económicas</h4>
                            {(!Array.isArray(actividades) || actividades.length === 0) ? (
                                <p className="text-center">No hay actividades económicas registradas</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                <th>Nombre</th>
                                                <th>Descripción</th>
                                                <th>Categoría</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {actividades.map((actividad) => (
                                                <tr key={actividad.id}>
                                                    <td>{actividad.codigoCiiu}</td>
                                                    <td>{actividad.nombre}</td>
                                                    <td>{actividad.descripcion}</td>
                                                    <td>{actividad.categoria}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-warning me-1"
                                                            onClick={() => editActividad(actividad)}
                                                            disabled={loading}
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-danger"
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
                </div>
            </div>
        </div>
    );
};

export default Home;
