import axios from '../api/axios';
import IniciarSesionRequest from '../models/InicioS';

const authService = {
    async iniciarSesion(email, contrasena) {
        try {
            const request = new IniciarSesionRequest({ email, contrasena });
            request.validate();

            console.log('Sending login request:', { email: request.email, contrasena: request.contrasena });

            const response = await axios.post('Login/iniciarSesion', {
                email: request.email,
                contrasena: request.contrasena
            }, { withCredentials: true });

            return response.data;
        } catch (error) {
            console.error('Error en authService.iniciarSesion:', error);
            throw new Error(error.response?.data?.message || 'Error en inicio de sesión');
        }
    },

    async registroUsuario(empresaData) {
        try {
            if (empresaData.contrasena !== empresaData.confirmarContrasena) {
                throw new Error('La contraseña no coincide con la confirmación');
            }

            const loginRequest = new IniciarSesionRequest({
                email: empresaData.email,
                contrasena: empresaData.contrasena
            });
            loginRequest.validate();

            const requestData = {
                ...empresaData,
                contrasena: empresaData.contrasena,
                confirmarContrasena: empresaData.confirmarContrasena
            };

            const response = await axios.post('Login/registroUsuario', requestData);

            if (response.data) {
                localStorage.setItem('authData', JSON.stringify({
                    email: response.data.email,
                    id: response.data.id,
                    nombre: response.data.nombreComercial
                }));
            }

            return response.data;
        } catch (error) {
            let errorMessage = 'Error en registro';
            if (error.response?.data) {
                errorMessage = error.response.data.message || error.response.data;
            } else if (error.message) {
                errorMessage = error.message;
            }
            console.error('Error en authService.registroUsuario:', error);
            throw new Error(errorMessage);
        }
    },

    async cerrarSesion() {
        try {
            await axios.post('Login/cerrarSesion', {}, { withCredentials: true });
            localStorage.removeItem('authData');
            return true;
        } catch (error) {
            console.error('Error en authService.cerrarSesion:', error);
            localStorage.removeItem('authData');
            throw new Error(error.response?.data?.message || 'Error al cerrar sesión');
        }
    },

    getUsuarioActual() {
        const authData = localStorage.getItem('authData');
        if (!authData) return null;
        try {
            return JSON.parse(authData);
        } catch (e) {
            console.error('Error parsing authData:', e);
            return null;
        }
    },

    isAuthenticated() {
        return !!this.getUsuarioActual();
    },

    setupAxiosInterceptors() {
        axios.interceptors.request.use(config => {
            const authData = this.getUsuarioActual();
            if (authData?.token) {
                config.headers.Authorization = `Bearer ${authData.token}`;
            }
            return config;
        });

        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 401) {
                    localStorage.removeItem('authData');
                    if (typeof window !== 'undefined') {
                        window.location.href = '/login';
                    }
                }
                return Promise.reject(error);
            }
        );
    }
};

authService.setupAxiosInterceptors();

export default authService;
