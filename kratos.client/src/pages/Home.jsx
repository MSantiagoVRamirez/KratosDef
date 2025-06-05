// Archivo codificado en UTF-8
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Archivo de estilos que crearemos después

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Bienvenido a Kratos App</h1>
          <p className="hero-subtitle">Tu solución integral para gestión y productividad</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">Iniciar Sesión</Link>
            <Link to="/register" className="btn btn-secondary">Registrarse</Link>
          </div>
        </div>
        <div className="hero-image">
          {/* Puedes reemplazar esto con una imagen real */}
          <div className="placeholder-image"></div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Nuestras Características</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">??</div>
            <h3>Rápido y Eficiente</h3>
            <p>Tecnología de vanguardia para máxima productividad.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">??</div>
            <h3>Seguridad Garantizada</h3>
            <p>Tus datos siempre protegidos con cifrado avanzado.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">??</div>
            <h3>Sincronización en Tiempo Real</h3>
            <p>Tus datos actualizados en todos tus dispositivos.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">Lo que dicen nuestros usuarios</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"Esta aplicación ha transformado completamente mi flujo de trabajo."</p>
            <div className="testimonial-author">- María G.</div>
          </div>
          <div className="testimonial-card">
            <p>"La mejor inversión que he hecho para mi negocio este año."</p>
            <div className="testimonial-author">- Carlos R.</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>¿Listo para comenzar?</h2>
        <p>Únete a miles de usuarios satisfechos hoy mismo.</p>
        <Link to="/register" className="btn btn-large">Regístrate Gratis</Link>
      </section>
    </div>
  );
}

export default Home;