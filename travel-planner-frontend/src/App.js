// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import AddLocal from './components/AddLocal';
import AddCliente from './components/ClientAdd';
import LoginPage from './components/LoginPage';
import AddEmpresa from './components/AddEmpresa';
import Home from './components/home';
import Reservas from './components/Reservas';
import CadastroPage from './components/CadastroPage';
import MinhasReservas from './components/minhasReservas';

import './App.css'; // Importando o CSS

function App() {
  const [needsRefresh, setNeedsRefresh] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role) {
      setUserRole(user.role);
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="App">
        <nav className="App-nav">
          <Link to="/">Home</Link>
          {userRole === 'admin' && <Link to="/clientes">Clientes</Link>}
          {userRole === 'admin' && <Link to="/empresas">Empresas</Link>}
          {(userRole === 'empresa' || userRole === 'admin') && <Link to="/locais">Locais</Link>}
          {(userRole === 'empresa' || userRole === 'admin') && <Link to="/reservas">Reservas da Empresa</Link>}
          {(userRole === 'cliente' || userRole === 'empresa' || userRole === 'admin') && <Link to="/minhasReservas">Minhas Reservas</Link>}
          {/* <Link to="/login">Login</Link> */}
          {isLoggedIn ? (
            <LogoutButton setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/minhasReservas" element={<MinhasReservas />} />
          <Route path="/clientes" element={<AddCliente />} />
          <Route path="/empresas" element={<AddEmpresa needsRefresh={needsRefresh} setNeedsRefresh={setNeedsRefresh} />} />
          <Route path="/locais" element={<AddLocal />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/cadastro" element={<CadastroPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function LogoutButton({ setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="logout-button">Logout</button>
  );
}
export default App;
