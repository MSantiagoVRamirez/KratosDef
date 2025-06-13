import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../Services/IniciarSesion';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/home';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authService.iniciarSesion(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
            setLoading(false);
        }
    };


    return (
        <div className="fullscreen-container">
            <div className="login-container">
                <div className="login-card">
                    <h2 className="login-title">Iniciar Sesión</h2>

                    {error && (
                        <div className="error-message">
                            {error}
                            <button onClick={() => setError('')} className="close-button">×</button>
                        </div>
                    )}

                    {successMessage && (
                        <div className="success-message">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label>Correo Electrónico</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" disabled={loading} className="submit-button">
                            {loading ? 'Cargando...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <div className="login-footer">
                        ¿No tienes cuenta? <a href="/registro" className="register-link">Regístrate aquí</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;