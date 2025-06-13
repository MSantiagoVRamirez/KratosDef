// ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';
import authService from '../Services/IniciarSesion';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = authService.isAuthenticated();

    if (!isAuthenticated) {
        // Guardamos la ubicación a la que intentaban acceder
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;