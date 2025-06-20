import axios from '../api/axios';

const ENDPOINT = 'Usuarios';


    const UsuariosService = {
        create: async (usuarioData) => {
            try {
                const { id: _id, ...dataToSend } = usuarioData;

                // Cambiar la ruta para que coincida con el backend
                const response = await axios.post(`${ENDPOINT}/RegistrarUsuario`, dataToSend, {
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

       update: async (usuarioData) => {
            try {
                // Cambiar la ruta para que coincida con el backend
                const response = await axios.put(`${ENDPOINT}/Actualizar`, usuarioData, {
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

        getAll: async () => {
            try {
                const response = await axios.get(`${ENDPOINT}/Listar`);
                return response.data;
            } catch (error) {
                console.error('Error al listar usuarios:', error.response?.data || error.message);
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
                console.error('Error al eliminar usuario:', error.response?.data || error.message);
                throw error;
            }
        }
    }



export default UsuariosService;