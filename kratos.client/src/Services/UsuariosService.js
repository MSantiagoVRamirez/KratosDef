import axios from '../api/axios';

const ENDPOINT = 'Usuarios';

const empresaService = {
    registroEmpresa: async (empresaData) => {
        try {
            // Destructure to remove id without triggering unused var warning
            const { id: _id, ...dataToSend } = empresaData;

            const response = await axios.post(`${ENDPOINT}/RegistroEmpresa`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al registrar la empresa:', error.response?.data || error.message);
            throw error;
        }
    },

    listarEmpresas: async () => {
        try {
            const response = await axios.get(`${ENDPOINT}/ListarEmpresas`);
            return response.data;
        } catch (error) {
            console.error('Error al listar empresas:', error.response?.data || error.message);
            throw error;
        }
    },

    consultarEmpresa: async (id) => {
        try {
            const response = await axios.get(`${ENDPOINT}/ConsultarEmpresa`, {
                params: { id }
            });
            return response.data;
        } catch (error) {
            console.error('Error al consultar empresa:', error.response?.data || error.message);
            throw error;
        }
    },

    actualizarEmpresa: async (empresaData) => {
        try {
            const response = await axios.put(`${ENDPOINT}/ActualizarEmpresa`, empresaData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar empresa:', error.response?.data || error.message);
            throw error;
        }
    },

    eliminarEmpresa: async (id) => {
        try {
            const response = await axios.delete(`${ENDPOINT}/EliminarEmpresa`, {
                params: { id }
            });
            return response.data;
        } catch (error) {
            console.error('Error al eliminar empresa:', error.response?.data || error.message);
            throw error;
        }
    }
};

export default empresaService;