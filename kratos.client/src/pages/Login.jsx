import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/IniciarSesion';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de �xito
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage(''); // Limpiar mensaje de �xito
        setLoading(true);

        try {
            await authService.iniciarSesion(email, password);
            setSuccessMessage('Inicio de sesi�n exitoso.'); // Mensaje de �xito
            navigate('/');
        } catch (err) {
            setError(err.message || 'Error al iniciar sesi�n. Verifica tus credenciales.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Iniciar Sesi�n</h2>
                    <p>Ingresa tus credenciales para acceder al sistema</p>
                </div>

                {error && (
                    <div className="alert error-alert">
                        {error}
                        <button className="alert-close" onClick={() => setError('')}>�</button>
                    </div>
                )}

                {successMessage && (
                    <div className="alert success-alert">
                        {successMessage}
                        <button className="alert-close" onClick={() => setSuccessMessage('')}>�</button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-field">
                        <label htmlFor="email">Correo Electr�nico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="password">Contrase�a</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loading}
                        >
                            {loading ? 'Iniciando sesi�n...' : 'Iniciar Sesi�n'}
                        </button>
                    </div>
                </form>

                <div className="auth-footer">
                    <p>
                        �No tienes una cuenta?{' '}
                        <button className="link-button" onClick={() => navigate('/register')}>
                            Reg�strate aqu�
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
