import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Inicio from './pages/Inicio';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Unauthorized from './pages/Unauthorized';
import Login from './components/login';
import Home from './pages/Inicio';

function App() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio/>}>
        <Route index element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="MainLayout" element={<MainLayout />}/>
           <Route path="Dashboard" element={<Dashboard />}/>
        </Route>
    </Routes>
    </BrowserRouter>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;


