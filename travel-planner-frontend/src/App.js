import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddLocal from './components/AddLocal';
import AddCliente from './components/ClientAdd';
import LoginPage from './components/LoginPage';
import AddEmpresa from './components/AddEmpresa';
import Home from './components/home';
import Reservas from './components/Reservas';

import './App.css'; // Importando o CSS

function App() {
  const [needsRefresh, setNeedsRefresh] = useState(true);

  return (
    <Router>
      <div className="App">
        Locais Disponíveis: 
        <Link to="/">Aqui</Link>
        <nav className="App-nav">
          <Link to="/clientes">Clientes</Link>
          <Link to="/empresas">Empresas</Link>
          <Link to="/locais">Locais</Link>
          <Link to="/login">Login/Cadastro</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/clientes" element={<AddCliente />} />
          <Route path="/empresas" element={<AddEmpresa needsRefresh={needsRefresh} setNeedsRefresh={setNeedsRefresh} />} />
          <Route path="/locais" element={<AddLocal />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
