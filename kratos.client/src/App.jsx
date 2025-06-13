import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';

// Importación de las páginas
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Regimenes from './pages/Regimenes';
import TiposSociedad from './pages/TiposSociedad';
import Unauthorized from './pages/Unauthorized';
import Inicio from './pages/Inicio'; // Importar la página de inicio
import Register from './pages/Register';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Ruta principal muestra Inicio */}
                    <Route path="/" element={<Inicio />} />

                    {/* Otras rutas públicas */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />

                    {/* Rutas protegidas con MainLayout */}
                    <Route element={<MainLayout />}>
                        <Route path="/home" element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } />

                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } />

                        <Route path="/regimenes" element={
                            <ProtectedRoute>
                                <Regimenes />
                            </ProtectedRoute>
                        } />

                        <Route path="/tipos-sociedad" element={
                            <ProtectedRoute>
                                <TiposSociedad />
                            </ProtectedRoute>
                        } />

                        <Route path="/register" element={
                            <ProtectedRoute>
                                <Register />
                            </ProtectedRoute>
                        } />
                    </Route>

                    {/* Redirección para rutas no encontradas */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
