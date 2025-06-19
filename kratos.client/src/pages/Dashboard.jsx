import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ActividadEconomicaService from '../services/actividadEconomicaServices';
import authService from '../services/IniciarSesion';
import './Dashboard.css';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [actividades, setActividades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchActividades();
    }, []);

    const fetchActividades = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ActividadEconomicaService.getAll();
            setActividades(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Error al cargar las actividades económicas');
            console.error(err);
            setActividades([]);
        } finally {
            setLoading(false);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleLogout = async () => {
        try {
            await authService.cerrarSesion();
            navigate('/login');
        } catch (error) {
            setError('Error al cerrar sesión');
            console.error(error);
        }
    };

    // Estadísticas calculadas
    const totalActividades = actividades.length;
    const categoriasUnicas = [...new Set(actividades.map(a => a.categoria))].length;

    // Distribución por categoría
    const distribucionCategorias = actividades.reduce((acc, actividad) => {
        acc[actividad.categoria] = (acc[actividad.categoria] || 0) + 1;
        return acc;
    }, {});

    // Top 5 actividades más comunes
    const topActividades = [...actividades]
        .sort((a, b) => b.codigoCiiu.localeCompare(a.codigoCiiu))
        .slice(0, 5);

    // Datos para el gráfico de torta
    const pieChartData = {
        labels: Object.keys(distribucionCategorias),
        datasets: [
            {
                data: Object.values(distribucionCategorias),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#8AC24A',
                    '#FF6B6B',
                    '#47B8E0',
                    '#7FDBFF'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#8AC24A',
                    '#FF6B6B',
                    '#47B8E0',
                    '#7FDBFF'
                ],
                borderWidth: 1
            }
        ]
    };

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 12,
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const percentage = Math.round((value / totalActividades) * 100);
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        }
    };

    return (
        <div className="app-container">
            {/* Navbar Superior */}
            <nav className="app-navbar">
                <div className="navbar-left">
                    <button className="menu-button" onClick={toggleSidebar}>
                        <span className="menu-icon">≡</span>
                    </button>
                    <h1 className="navbar-title">Dashboard Estadístico</h1>
                </div>
                <div className="navbar-right">
                    <div className="user-menu">
                        <span className="user-avatar">US</span>
                        <button className="logout-button" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-menu">
                    <div
                        className={`menu-item ${isActive('/Dashboard') ? 'active' : ''}`}
                        onClick={() => navigate('/Dashboard')}
                    >
                        <span>Dashboard</span>
                    </div>
                    <div
                        className={`menu-item ${isActive('/Home') ? 'active' : ''}`}
                        onClick={() => navigate('/Home')}
                    >
                        <span>Actividad Económica</span>
                    </div>
                    <div
                        className={`menu-item ${isActive('/Regimenes') ? 'active' : ''}`}
                        onClick={() => navigate('/Regimenes')}
                    >
                        <span>Regímenes Tributarios</span>
                    </div>
                    <div
                        className={`menu-item ${isActive('/TiposSociedad') ? 'active' : ''}`}
                        onClick={() => navigate('/TiposSociedad')}
                    >
                        <span>Tipos de Sociedad</span>
                    </div>
                    <div
                        className={`menu-item ${isActive('/Empresa') ? 'active' : ''}`}
                        onClick={() => navigate('/Empresa')}
                    >
                        <span>Empresas</span>
                    </div>
                    <div
                        className={`menu-item ${isActive('/Usuarios') ? 'active' : ''}`}
                        onClick={() => navigate('/Usuarios')}
                    >
                        <span>Usuarios</span>
                    </div>
                </div>
            </aside>

            {/* Contenido Principal */}
            <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <div className="dashboard-container">
                    <h2 className="page-title">Estadísticas de Actividades Económicas</h2>

                    {/* Alertas */}
                    {error && (
                        <div className="alert error-alert">
                            {error}
                            <button className="alert-close" onClick={() => setError(null)}>×</button>
                        </div>
                    )}

                    {/* Métricas principales */}
                    <div className="metrics-row">
                        <div className="metric-card">
                            <h3>Total Actividades</h3>
                            <p className="metric-value">{totalActividades}</p>
                        </div>
                        <div className="metric-card">
                            <h3>Categorías Únicas</h3>
                            <p className="metric-value">{categoriasUnicas}</p>
                        </div>
                        <div className="metric-card">
                            <h3>Actividades por Categoría</h3>
                            <p className="metric-value">{Object.keys(distribucionCategorias).length}</p>
                        </div>
                    </div>

                    {/* Gráficos y visualizaciones */}
                    <div className="charts-row">
                        {/* Gráfico de torta */}
                        <div className="chart-card">
                            <h3>Distribución por Categoría</h3>
                            <div className="chart-container pie-chart-container">
                                {loading ? (
                                    <div className="loading-state">
                                        <div className="spinner"></div>
                                        <p>Cargando datos...</p>
                                    </div>
                                ) : actividades.length > 0 ? (
                                    <Pie data={pieChartData} options={pieChartOptions} />
                                ) : (
                                    <div className="empty-state">
                                        <p>No hay datos para mostrar</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Gráfico de barras (opcional, puedes mantener el que ya tenías) */}
                        <div className="chart-card">
                            <h3>Top 5 Actividades</h3>
                            <div className="chart-container">
                                {loading ? (
                                    <div className="loading-state">
                                        <div className="spinner"></div>
                                        <p>Cargando datos...</p>
                                    </div>
                                ) : (
                                    <table className="top-actividades-table">
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                <th>Nombre</th>
                                                <th>Categoría</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topActividades.map(actividad => (
                                                <tr key={actividad.id}>
                                                    <td>{actividad.codigoCiiu}</td>
                                                    <td>{actividad.nombre}</td>
                                                    <td>{actividad.categoria}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Datos detallados */}
                    <div className="detailed-data">
                        <h3>Resumen de Actividades</h3>
                        <div className="data-grid">
                            {Object.entries(distribucionCategorias).map(([categoria, count]) => (
                                <div key={categoria} className="data-item">
                                    <h4>{categoria}</h4>
                                    <p>{count} actividades</p>
                                    <p>{((count / totalActividades) * 100).toFixed(1)}% del total</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;