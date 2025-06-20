import axios from '../api/axios';

const ENDPOINT = 'Usuarios';

const UsuariosService = {
    create: async (usuarioData) => {
        try {
            // Asegurar que los nombres de campos coincidan con el backend
            const dataToSend = {
                nombres: usuarioData.nombre,
                apellidos: usuarioData.apellidos,
                email: usuarioData.email,
                telefono: usuarioData.telefono,
                token: usuarioData.token,
                contrasena: usuarioData.contrasena,
                rolesId: usuarioData.rolesId || 1, // Valor por defecto si no se especifica
                estado: usuarioData.estado
            };

            const response = await axios.post(`${ENDPOINT}/RegistrarUsuario`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al registrar usuario:', error.response?.data || error.message);
            throw error;
        }
    },

    update: async (usuarioData) => {
        try {
            const dataToSend = {
                id: usuarioData.id,
                nombres: usuarioData.nombre,
                apellidos: usuarioData.apellidos,
                email: usuarioData.email,
                telefono: usuarioData.telefono,
                token: usuarioData.token,
                rolesId: usuarioData.rolesId,
                estado: usuarioData.estado
            };

            // Solo incluir contraseña si se está cambiando
            if (usuarioData.contrasena) {
                dataToSend.contrasena = usuarioData.contrasena;
            }

            const response = await axios.put(`${ENDPOINT}/Actualizar`, dataToSend);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar usuario:', error.response?.data || error.message);
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
};

export default UsuariosService;