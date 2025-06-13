import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import empresaService from '../services/RegistroEmpresa'; // Aseg�rate de que la ruta sea correcta
import './Auth.css';

const Register = () => {
    const [empresaData, setEmpresaData] = useState({
        razonSocial: '',
        email: '',
        contrasena: '',
        confirmarContrasena: '',
        nit: '',
        telefono: '',
        dv: '',
        tiposociedadId: null, // Aseg�rate de agregar este campo si es necesario
        actividadId: null, // Aseg�rate de agregar este campo si es necesario
        regimenId: null, // Aseg�rate de agregar este campo si es necesario
        token: '' // Aseg�rate de agregar este campo si es necesario
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmpresaData({
            ...empresaData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (empresaData.contrasena !== empresaData.confirmarContrasena) {
            setError('Las contrase�as no coinciden');
            return;
        }

        setLoading(true);

        try {
            await empresaService.registroEmpresa(empresaData);
            navigate('/login', { state: { success: 'Registro exitoso. Por favor inicia sesi�n.' } });
        } catch (err) {
            setError(err.message || 'Error al registrar la cuenta. Int�ntalo de nuevo.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Registro de Empresa</h2>
                    <p>Completa el formulario para crear una nueva cuenta</p>
                </div>

                {error && (
                    <div className="alert error-alert">
                        {error}
                        <button className="alert-close" onClick={() => setError('')}>�</button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-field">
                        <label htmlFor="razonSocial">Raz�n Social</label>
                        <input
                            type="text"
                            id="razonSocial"
                            name="razonSocial"
                            value={empresaData.razonSocial}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="email">Correo Electr�nico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={empresaData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="nit">NIT</label>
                        <input
                            type="text"
                            id="nit"
                            name="nit"
                            value={empresaData.nit}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="telefono">Tel�fono</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={empresaData.telefono}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="dv">DV</label>
                        <input
                            type="text"
                            id="dv"
                            name="dv"
                            value={empresaData.dv}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="contrasena">Contrase�a</label>
                        <input
                            type="password"
                            id="contrasena"
                            name="contrasena"
                            value={empresaData.contrasena}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="confirmarContrasena">Confirmar Contrase�a</label>
                        <input
                            type="password"
                            id="confirmarContrasena"
                            name="confirmarContrasena"
                            value={empresaData.confirmarContrasena}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loading}
                        >
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </button>
                    </div>
                </form>

                <div className="auth-footer">
                    <p>
                        �Ya tienes una cuenta?{' '}
                        <button className="link-button" onClick={() => navigate('/login')}>
                            Inicia sesi�n aqu�
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
