import axios from "axios";
const API_URL = "https://localhost:7054/api/ActividadEconomica";
axios.defaults.withCredentials = true;

// Definición del modelo de ActividadEconomica (solo como referencia, sin tipos)
const ActividadEconomica = {
    id: 0,
    codigoCiiu: 0,
    nombre: "",
    descripcion: "",
    categoria: "",
};

const getAll = () => {
    return axios.get(`${API_URL}/leer`);
}
const get = (id) => {
    return axios.get(`${API_URL}/consultar`, { params: { 'Id': id } });
}

const create = (ActividadEconomica) => {
    return axios.post(`${API_URL}/insertar`, ActividadEconomica);
}

const update = (ActividadEconomica) => {
    return axios.put(`${API_URL}/editar`, ActividadEconomica);
}

const remove = (id) => {
    return axios.delete(`${API_URL}/eliminar`, { params: { 'Id': id } });
}

export default { getAll, get, create, update, remove };
