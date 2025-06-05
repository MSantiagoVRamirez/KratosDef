import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Dashboard = () => {
  const { user, empresa } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard');
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Cargando dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <h1>Bienvenido, {user?.nombre}</h1>
      <h2>Empresa: {empresa?.nombre}</h2>
      
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Proyectos Activos</h3>
          <p>{data?.proyectosActivos || 0}</p>
        </div>
        <div className="dashboard-card">
          <h3>Tareas Pendientes</h3>
          <p>{data?.tareasPendientes || 0}</p>
        </div>
        <div className="dashboard-card">
          <h3>Clientes</h3>
          <p>{data?.totalClientes || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;