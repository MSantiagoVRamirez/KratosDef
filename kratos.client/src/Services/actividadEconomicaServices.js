import axios from 'axios';

const API_URL = 'https://localhost:7054/api/ActividadEconomicas';

const getAll = async () => {
    const response = await axios.get(`${API_URL}/leer`);
    return response.data;
};

const create = async (actividad) => {
    // Asegurarse de que los campos sean correctos y no nulos
    const payload = {
        codigoCiiu: actividad.codigoCiiu ?? '',
        nombre: actividad.nombre ?? '',
        descripcion: actividad.descripcion ?? '',
        categoria: actividad.categoria ?? ''
    };
    // Validar que los campos requeridos no estén vacíos
    if (!payload.codigoCiiu || !payload.nombre || !payload.categoria) {
        throw new Error('Faltan campos obligatorios');
    }
    const response = await axios.post(`${API_URL}/insertar`, payload);
    return response.data;
};

const update = async (actividad) => {
    const response = await axios.put(`${API_URL}/editar`, actividad);
    return response.data;
};

const remove = async (id) => {
    const response = await axios.delete(`${API_URL}/eliminar`, { data: { id } });
    return response.data;
};

const ActividadEconomicaService = {
    getAll,
    create,
    update,
    remove
};

export default ActividadEconomicaService;
