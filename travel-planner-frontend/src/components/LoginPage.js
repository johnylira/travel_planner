// src/components/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import './LoginPage.css';
const LoginPage = ({ setIsLoggedIn }) => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Adicionar estado para gerenciar erros
  const [isLoading, setLoading] = useState(false); // Estado para indicar carregamento
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true); // Iniciar o indicador de carregamento
    setError(''); // Limpar erros anteriores
    try {
      const user = await userService.login(email, password);
      console.log(user)
      localStorage.setItem('user', JSON.stringify(user));
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Falha no login. Verifique seu e-mail e senha.'); // Definir mensagem de erro
      setIsLoggedIn(false);
    } finally {
      setLoading(false); // Encerrar o indicador de carregamento
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="login-error">{error}</p>} 
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Login'}
        </button>
        <Link to="/cadastro">Não tem conta? Cadastre-se</Link>
      </form>
    </div>
  );
};

export default LoginPage;
