// components/LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css'; // Importa o CSS

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Login com:', username, password);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    console.log('Cadastro com:', username, password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-form-title">Login / Cadastro</div>
        <label htmlFor="username">
          Usuário:
          <input
            type="text"
            id="username"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            id="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
        <button type="button" onClick={handleRegister}>Cadastro</button>
      </form>
    </div>
  );
};

export default LoginPage;
