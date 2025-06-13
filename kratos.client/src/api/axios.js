    import axios from 'axios';

    const API_URL = 'https://localhost:7054/api';

    // Configura axios para incluir credenciales y manejar CORS
    axios.defaults.withCredentials = true;

    const api = axios.create({
      baseURL: API_URL,
      withCredentials: true,
    });

    export { API_URL };
    export default api;