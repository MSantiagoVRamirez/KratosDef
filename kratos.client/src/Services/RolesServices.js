import axios, { API_URL } from '../api/axios';
import Roles from '../models/Roles';

const ENDPOINT = 'Roles';

const getAll = async () => {
    try {
        const response = await axios.get(`${ENDPOINT}/Listar`);
        return response.data.map(item => new Roles(item));
    } catch (error) {
        console.error('Error fetching rol:', error.response?.data || error.message);
        throw error;
    }
};
const create = async (rolData) => {
    try {
        // Destructure to remove id without assigning it to a variable
        const { id: _, ...dataToSend } = rolData;

        const response = await axios.post(`${ENDPOINT}/RegistrarRol`, dataToSend, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating rol:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
};

const update = async (rolData) => {
    try {
        const rol = new Roles(rolData);
       rol.validate();

        const response = await axios.put(`${ENDPOINT}/Actualizar`, rol.toJSON());
        return new Roles(response.data);
    } catch (error) {
        console.error('Error updating rol:', error.response?.data || error.message);
        throw error;
    }
};

const remove = async (id) => {
    try {
        const response = await axios.delete(`${ENDPOINT}/Eliminar`, {
            params: { id }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting rol:', error.response?.data || error.message);
        throw error;
    }
};

export default {
    getAll,
    create,
    update,
    remove
};