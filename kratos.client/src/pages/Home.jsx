import { useState, useEffect } from 'react';

import ActividadEconomicaService from '../Services/actividadEconomicaService';

const Home = () => {
  const [actividades, setActividades] = useState([]);
  const [currentActividad, setCurrentActividad] = useState({
    id: 0,
    codigoCiiu: 0,
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
      const response = await ActividadEconomicaService.getAll();
      setActividades(response.data);
    } catch (err) {
      setError('Error al cargar las actividades económicas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentActividad({
      ...currentActividad,
      [name]: name === 'codigoCiiu' ? parseInt(value) || 0 : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing) {
        await ActividadEconomicaService.update(currentActividad);
      } else {
        await ActividadEconomicaService.create(currentActividad);
      }
      resetForm();
      fetchActividades();
    } catch (err) {
      setError('Error al guardar la actividad económica');
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
        fetchActividades();
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
      codigoCiiu: 0,
      nombre: '',
      descripcion: '',
      categoria: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Actividades Económicas</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="text-center">Cargando...</div>}

      <div className="row">
        <div className="col-md-6">
          <h4>{isEditing ? 'Editar Actividad' : 'Nueva Actividad'}</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Código CIIU</label>
              <input
                type="number"
                className="form-control"
                name="codigoCiiu"
                value={currentActividad.codigoCiiu}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
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
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                name="descripcion"
                value={currentActividad.descripcion}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <input
                type="text"
                className="form-control"
                name="categoria"
                value={currentActividad.categoria}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary me-2" disabled={loading}>
              {isEditing ? 'Actualizar' : 'Guardar'}
            </button>
            {isEditing && (
              <button type="button" className="btn btn-secondary" onClick={resetForm} disabled={loading}>
                Cancelar
              </button>
            )}
          </form>
        </div>

        <div className="col-md-6">
          <h4>Lista de Actividades Económicas</h4>
          {actividades.length === 0 ? (
            <p>No hay actividades económicas registradas</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
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
  );
};

export default Home;
