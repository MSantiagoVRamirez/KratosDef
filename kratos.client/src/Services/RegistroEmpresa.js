import axios from '../api/axios';

const ENDPOINT = 'Empresa';

const empresaService = {
    // Cambiar en empresaService.js
   
        registroEmpresa: async (empresaData) => {
            try {
                const { id: _id, ...dataToSend } = empresaData;

                // Cambiar la ruta para que coincida con el backend
                const response = await axios.post(`${ENDPOINT}/insertar`, dataToSend, {
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

        actualizarEmpresa: async (empresaData) => {
            try {
                // Cambiar la ruta para que coincida con el backend
                const response = await axios.put(`${ENDPOINT}/editar`, empresaData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                return response.data;
            } catch (error) {
                console.error('Error al actualizar empresa:', error.response?.data || error.message);
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