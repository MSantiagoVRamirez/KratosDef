import axios from 'axios';

const API_URL = 'https://localhost:7054/api/ActividadEconomicas';

// Configura axios para incluir credenciales y manejar CORS
axios.defaults.withCredentials = true;

const getAll = async () => {
    try {
        const response = await axios.get(`${API_URL}/leer`);
        return response.data;
    } catch (error) {
        console.error('Error fetching actividades:', error.response?.data || error.message);
        throw error;
    }
};

const create = async (actividad) => {
    try {
        // Asegurar que codigoCiiu sea string como espera el backend
        const payload = {
            codigoCiiu: actividad.codigoCiiu.toString(), // Convertir a string
            nombre: actividad.nombre,
            descripcion: actividad.descripcion,
            categoria: actividad.categoria
        };

        // Validación de campos requeridos
        if (!payload.codigoCiiu || !payload.nombre || !payload.descripcion || !payload.categoria) {
            throw new Error('Todos los campos son obligatorios');
        }

        const response = await axios.post(`${API_URL}/insertar`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating actividad:', error.response?.data || error.message);
        throw error;
    }
};

const update = async (actividad) => {
    try {
        const payload = {
            id: actividad.id,
            codigoCiiu: actividad.codigoCiiu.toString(),
            nombre: actividad.nombre,
            descripcion: actividad.descripcion,
            categoria: actividad.categoria
        };

        const response = await axios.put(`${API_URL}/editar`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating actividad:', error.response?.data || error.message);
        throw error;
    }
};

const remove = async (id) => {
    try {
        // Forma correcta para ASP.NET Core de enviar parámetros en DELETE
        const response = await axios.delete(`${API_URL}/eliminar`, {
            params: { id }, // Enviar como query parameter
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting actividad:', error.response?.data || error.message);
        throw error;
    }
};

export default {
    getAll,
    create,
    update,
    remove
};
