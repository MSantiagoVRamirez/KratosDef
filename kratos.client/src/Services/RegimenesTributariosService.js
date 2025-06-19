import axios, { API_URL } from '../api/axios';
import RegimenTributario from '../models/RegimenesTributarios';

const ENDPOINT = 'RegimenesTributarios';

const getAll = async () => {
    try {
        const response = await axios.get(`${ENDPOINT}/Listar`);
        return response.data.map(item => new RegimenTributario(item));
    } catch (error) {
        console.error('Error al obtener los regimenes:', error.response?.data || error.message);
        throw error;
    }
};

const getById = async (id) => {
    try {
        const response = await axios.get(`${ENDPOINT}/Consultar`, { params: { id } });
        return response.data ? new RegimenTributario(response.data) : null;
    } catch (error) {
        console.error('Error al consultar el rigimen:', error.response?.data || error.message);
        throw error;
    }
};

const create = async (regimenData) => {
    try {
        const regimen = new RegimenTributario(regimenData);
        regimen.validate();

        const response = await axios.post(`${ENDPOINT}/Registrar`, regimen.toJSON());
        return new RegimenTributario(response.data);
    } catch (error) {
        console.error('Error al crear el r�gimen:', error.response?.data || error.message);
        throw error;
    }
};

const update = async (regimenData) => {
    try {
        const regimen = new RegimenTributario(regimenData);
        regimen.validate();

        await axios.put(`${ENDPOINT}/Actualizar`, regimen.toJSON());
        return true;
    } catch (error) {
        console.error('Error al actualizar el r�gimen:', error.response?.data || error.message);
        throw error;
    }
};

const remove = async (id) => {
    try {
        await axios.delete(`${ENDPOINT}/Eliminar`, { params: { id } });
        return true;
    } catch (error) {
        console.error('Error al eliminar el r�gimen:', error.response?.data || error.message);
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