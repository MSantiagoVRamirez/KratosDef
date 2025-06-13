import axios, { API_URL } from '../api/axios';
import TiposSociedades from '../models/TiposSociedades';

const ENDPOINT = 'TiposSociedades';

const getAll = async () => {
    try {
        const response = await axios.get(`${ENDPOINT}/Listar`);
        return response.data.map(item => new TiposSociedades(item));
    } catch (error) {
        console.error('Error al obtener los tipos de sociedades:', error.response?.data || error.message);
        throw error;
    }
};

const getById = async (id) => {
    try {
        const response = await axios.get(`${ENDPOINT}/Consultar`, { params: { id } });
        return response.data ? new TiposSociedades(response.data) : null;
    } catch (error) {
        console.error('Error al consultar el tipo de sociedad:', error.response?.data || error.message);
        throw error;
    }
};

const create = async (sociedadData) => {
    try {
        const sociedad = new TiposSociedades(sociedadData);
        sociedad.validate();

        const response = await axios.post(`${ENDPOINT}/Registrar`, sociedad.toJSON());
        return new TiposSociedades(response.data);
    } catch (error) {
        console.error('Error al crear el tipo de sociedad:', error.response?.data || error.message);
        throw error;
    }
};

const update = async (sociedadData) => {
    try {
        const sociedad = new TiposSociedades(sociedadData);
        sociedad.validate();

        await axios.put(`${ENDPOINT}/Actualizar`, sociedad.toJSON());
        return true;
    } catch (error) {
        console.error('Error al actualizar el tipo de sociedad:', error.response?.data || error.message);
        throw error;
    }
};

const remove = async (id) => {
    try {
        await axios.delete(`${ENDPOINT}/Eliminar`, { params: { id } });
        return true;
    } catch (error) {
        console.error('Error al eliminar el tipo de sociedad:', error.response?.data || error.message);
        throw error;
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    remove
};