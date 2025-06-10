import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Inicio from './pages/Inicio';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

function App() {
    return (
    <div className="App">
      <Home />
    </div>
    );
}

export default App;
