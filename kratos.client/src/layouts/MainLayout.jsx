import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './MainLayout.css';

const MainLayout = () => {
  const navigate = useNavigate();
  const { user, empresa, logout } = useAuth();

  return (
    <div className="main-layout">
      {/* Navbar Superior */}
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Kratos App</h1>
        </div>
        <div className="navbar-right">
          <span className="user-info">
            {user?.nombre} - {empresa?.nombre}
          </span>
          <button onClick={logout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div className="content-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li onClick={() => navigate('/dashboard')}>Dashboard</li>
            <li onClick={() => navigate('/proyectos')}>Proyectos</li>
            <li onClick={() => navigate('/clientes')}>Clientes</li>
            <li onClick={() => navigate('/reportes')}>Reportes</li>
            <li onClick={() => navigate('/configuracion')}>Configuración</li>
          </ul>
        </aside>

        {/* Contenido Principal */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;