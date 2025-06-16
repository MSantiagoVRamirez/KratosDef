import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import empresaService from '../services/RegistroEmpresa';
import ActividadEconomicaService from '../services/actividadEconomicaServices';
import RegimenTributarioService from '../Services/RegimenesTributariosService';
import TiposSociedadesService from '../services/TiposSociedadesService';
import Empresas from '../models/Empresas';
import './Auth.css';

const Register = () => {
    const initialFormData = {
        razonSocial: '',
        email: '',
        contrasena: '',
        confirmarContrasena: '',
        nit: '',
        telefono: '',
        dv: '',
        tiposociedadId: null,
        actividadId: null,
        regimenId: null,
        token: '',
        nombreComercial: '',
        representanteLegal: ''
    };

    const [empresaData, setEmpresaData] = useState(initialFormData);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [tiposSociedad, setTiposSociedad] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [regimenes, setRegimenes] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        number: false
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingData(true);
                const [sociedadesRes, actividadesRes, regimenesRes] = await Promise.all([
                    TiposSociedadesService.getAll(),
                    ActividadEconomicaService.getAll(),
                    RegimenTributarioService.getAll()
                ]);
                setTiposSociedad(sociedadesRes);
                setActividades(actividadesRes);
                setRegimenes(regimenesRes);
            } catch (err) {
                console.error('Error cargando datos:', err);
                setError('Error al cargar los datos necesarios para el registro');
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmpresaData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validación en tiempo real para contraseñas
        if (name === 'contrasena') {
            validatePassword(value);
        }
    };

    const validatePassword = (password) => {
        setPasswordRequirements({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password)
        });
    };

    const handlePasswordBlur = () => {
        if (empresaData.contrasena && empresaData.confirmarContrasena &&
            empresaData.contrasena !== empresaData.confirmarContrasena) {
            setPasswordError('Las contraseñas no coinciden');
        } else {
            setPasswordError('');
        }
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setEmpresaData(prev => ({
            ...prev,
            [name]: value ? Number(value) : null
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setPasswordError('');

        try {
            // Debug: log password values for troubleshooting
            console.log('Contraseña:', empresaData.contrasena);
            console.log('Confirmar Contraseña:', empresaData.confirmarContrasena);

            // Trim passwords for comparison to avoid whitespace issues
            const trimmedContrasena = empresaData.contrasena.trim();
            const trimmedConfirmarContrasena = empresaData.confirmarContrasena.trim();

            if (trimmedContrasena !== trimmedConfirmarContrasena) {
                throw new Error('Las contraseñas no coinciden. Por favor verifica que ambas sean idénticas.');
            }

            if (!passwordRequirements.length || !passwordRequirements.uppercase || !passwordRequirements.number) {
                throw new Error('La contraseña no cumple con los requisitos mínimos de seguridad.');
            }

            // Crear instancia de Empresa sin enviar el ID
            const empresa = Empresas.fromFormData({
                ...empresaData,
                id: undefined, // Asegurar que no se envíe el ID
                contrasena: trimmedContrasena,
                confirmarContrasena: trimmedConfirmarContrasena
            });

            empresa.validate();

            setLoading(true);

            console.log('Datos a enviar:', empresa.toJSON());

            await empresaService.registroEmpresa(empresa.toJSON());

            navigate('/login', {
                state: {
                    success: 'Registro exitoso. Por favor inicia sesión.'
                }
            });
        } catch (err) {
            setError(err.message);
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <div className="loading-spinner">
                        <p>Cargando datos necesarios...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card" role="main">
                <div className="auth-header">
                    <h2>Registro de Empresa</h2>
                    <p>Completa el formulario para crear una nueva cuenta</p>
                </div>

                {error && (
                    <div className="alert error-alert" role="alert">
                        {error}
                        <button
                            className="alert-close"
                            onClick={() => setError('')}
                            aria-label="Cerrar alerta"
                        >
                            ×
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form" noValidate aria-describedby="form-instructions">
                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="razonSocial">Razón Social*</label>
                            <input
                                type="text"
                                id="razonSocial"
                                name="razonSocial"
                                value={empresaData.razonSocial}
                                onChange={handleChange}
                                required
                                maxLength="100"
                                placeholder="Ej: Mi Empresa SAS"
                                aria-required="true"
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="nombreComercial">Nombre Comercial*</label>
                            <input
                                type="text"
                                id="nombreComercial"
                                name="nombreComercial"
                                value={empresaData.nombreComercial}
                                onChange={handleChange}
                                required
                                maxLength="100"
                                placeholder="Ej: Mi Marca"
                                aria-required="true"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="nit">NIT*</label>
                            <input
                                type="text"
                                id="nit"
                                name="nit"
                                value={empresaData.nit}
                                onChange={handleChange}
                                required
                                maxLength="100"
                                placeholder="Ej: 123456789"
                                aria-required="true"
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
                                maxLength="100"
                                placeholder="Dígito de verificación"
                                aria-required="false"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="email">Correo Electrónico*</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={empresaData.email}
                                onChange={handleChange}
                                required
                                maxLength="100"
                                placeholder="correo@empresa.com"
                                aria-required="true"
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="telefono">Teléfono*</label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={empresaData.telefono}
                                onChange={handleChange}
                                required
                                maxLength="100"
                                placeholder="Ej: 3001234567"
                                aria-required="true"
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="representanteLegal">Representante Legal*</label>
                        <input
                            type="text"
                            id="representanteLegal"
                            name="representanteLegal"
                            value={empresaData.representanteLegal}
                            onChange={handleChange}
                            required
                            maxLength="100"
                            placeholder="Nombre completo"
                            aria-required="true"
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="token">Token de Seguridad*</label>
                        <input
                            type="text"
                            id="token"
                            name="token"
                            value={empresaData.token}
                            onChange={handleChange}
                            required
                            maxLength="100"
                            placeholder="Token proporcionado"
                            aria-required="true"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="tiposociedadId">Tipo de Sociedad*</label>
                            <select
                                id="tiposociedadId"
                                name="tiposociedadId"
                                value={empresaData.tiposociedadId || ''}
                                onChange={handleSelectChange}
                                required
                                disabled={loadingData}
                                className="styled-select"
                                aria-required="true"
                            >
                                <option value="">Seleccione un tipo</option>
                                {tiposSociedad.map((tipo) => (
                                    <option key={tipo.id} value={tipo.id}>
                                        {tipo.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-field">
                            <label htmlFor="actividadId">Actividad Económica*</label>
                            <select
                                id="actividadId"
                                name="actividadId"
                                value={empresaData.actividadId || ''}
                                onChange={handleSelectChange}
                                required
                                disabled={loadingData}
                                className="styled-select"
                                aria-required="true"
                            >
                                <option value="">Seleccione una actividad</option>
                                {actividades.map((actividad) => (
                                    <option key={actividad.id} value={actividad.id}>
                                        {actividad.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-field">
                            <label htmlFor="regimenId">Régimen Tributario*</label>
                            <select
                                id="regimenId"
                                name="regimenId"
                                value={empresaData.regimenId || ''}
                                onChange={handleSelectChange}
                                required
                                disabled={loadingData}
                                className="styled-select"
                                aria-required="true"
                            >
                                <option value="">Seleccione un régimen</option>
                                {regimenes.map((regimen) => (
                                    <option key={regimen.id} value={regimen.id}>
                                        {regimen.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="password-section">
                        <div className="form-row">
                            <div className="form-field">
                                <label htmlFor="contrasena">Contraseña*</label>
                                <div className="password-input-container">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="contrasena"
                                        name="contrasena"
                                        value={empresaData.contrasena}
                                        onChange={handleChange}
                                        onBlur={handlePasswordBlur}
                                        required
                                        maxLength="100"
                                        placeholder="Mínimo 8 caracteres"
                                        aria-required="true"
                                        aria-describedby="password-requirements"
                                    />
                                    <button
                                        type="button"
                                        className="show-password-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showPassword ? "Ocultar" : "Mostrar"}
                                    </button>
                                </div>
                            </div>

                            <div className="form-field">
                                <label htmlFor="confirmarContrasena">Confirmar Contraseña*</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="confirmarContrasena"
                                    name="confirmarContrasena"
                                    value={empresaData.confirmarContrasena}
                                    onChange={handleChange}
                                    onBlur={handlePasswordBlur}
                                    required
                                    maxLength="100"
                                    placeholder="Repita la contraseña"
                                    aria-required="true"
                                />
                            </div>
                        </div>

                        {passwordError && (
                            <div className="alert error-alert" role="alert">
                                {passwordError}
                            </div>
                        )}

                        <div className="password-requirements" id="password-requirements" aria-live="polite">
                            <p>La contraseña debe contener:</p>
                            <ul>
                                <li className={passwordRequirements.length ? 'valid' : ''}>
                                    {passwordRequirements.length ? '✓' : '•'} Mínimo 8 caracteres
                                </li>
                                <li className={passwordRequirements.uppercase ? 'valid' : ''}>
                                    {passwordRequirements.uppercase ? '✓' : '•'} Al menos una mayúscula
                                </li>
                                <li className={passwordRequirements.number ? 'valid' : ''}>
                                    {passwordRequirements.number ? '✓' : '•'} Al menos un número
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loading || loadingData}
                            aria-busy={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner" aria-hidden="true"></span>
                                    Registrando...
                                </>
                            ) : 'Registrarse'}
                        </button>
                    </div>
                </form>

                <div className="auth-footer">
                    <p>
                        ¿Ya tienes una cuenta?{' '}
                        <button
                            type="button"
                            className="link-button"
                            onClick={() => navigate('/login')}
                        >
                            Inicia sesión aquí
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

