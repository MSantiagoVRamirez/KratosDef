import axios from '../api/axios';

const ENDPOINT = 'Usuarios';

const empresaService = {
   create: async (empresaData) => {
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

   getAll: async () => {
        try {
            const response = await axios.get(`${ENDPOINT}/Listar`);
            return response.data;
        } catch (error) {
            console.error('Error al listar empresas:', error.response?.data || error.message);
            throw error;
        }
    },

    consult: async (id) => {
        try {
            const response = await axios.get(`${ENDPOINT}/Consultar`, {
                params: { id }
            });
            return response.data;
        } catch (error) {
            console.error('Error al consultar empresa:', error.response?.data || error.message);
            throw error;
        }
    },

   update: async (empresaData) => {
        try {
            const response = await axios.put(`${ENDPOINT}/Actualizar`, empresaData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar empresa:', error.response?.data || error.message);
            throw error;
        }
    },

  remove: async (id) => {
        try {
            const response = await axios.delete(`${ENDPOINT}/Eliminar`, {
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
