import axios, { API_URL } from '../api/axios';
import ActividadEconomica from '../models/ActividadEconomica';

const ENDPOINT = 'ActividadEconomicas';

const getAll = async () => {
    try {
        const response = await axios.get(`${ENDPOINT}/leer`);
        return response.data.map(item => new ActividadEconomica(item));
    } catch (error) {
        console.error('Error fetching actividades:', error.response?.data || error.message);
        throw error;
    }
};

const create = async (actividadData) => {
    try {
        const actividad = new ActividadEconomica(actividadData);
        actividad.validate();

        const response = await axios.post(`${ENDPOINT}/insertar`, actividad.toJSON());
        return new ActividadEconomica(response.data);
    } catch (error) {
        console.error('Error creating actividad:', error.response?.data || error.message);
        throw error;
    }
};

const update = async (actividadData) => {
    try {
        const actividad = new ActividadEconomica(actividadData);
        actividad.validate();

        const response = await axios.put(`${ENDPOINT}/editar`, actividad.toJSON());
        return new ActividadEconomica(response.data);
    } catch (error) {
        console.error('Error updating actividad:', error.response?.data || error.message);
        throw error;
    }
};

const remove = async (id) => {
    try {
        const response = await axios.delete(`${ENDPOINT}/eliminar`, {
            params: { id }
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