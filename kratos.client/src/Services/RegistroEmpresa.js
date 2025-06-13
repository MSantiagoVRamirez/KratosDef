import axios from '../api/axios';
import Empresas from '../models/Empresas';

const ENDPOINT = 'Empresa';

const registroEmpresa = async (empresaData) => {
    try {
        const empresa = new Empresas(empresaData);
        empresa.validate(); // Validar los datos de la empresa

        // Enviar la solicitud de registro a la API
        const response = await axios.post(`${ENDPOINT}/RegistroEmpresa`, empresa.toJSON());
        return new Empresas(response.data); // Retornar la nueva instancia de Empresas
    } catch (error) {
        console.error('Error al registrar la empresa:', error.response?.data || error.message);
        throw error; // Lanzar el error para que pueda ser manejado en el componente
    }
};

export default {
    registroEmpresa
};
