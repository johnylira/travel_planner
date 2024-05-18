//components/CadastroPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // para redirecionar para login
import userService from '../services/userService';

const CadastroPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cliente');
  const navigate = useNavigate(); // para redirecionar para login
  
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const newUser = await userService.register({ email, password, role });
      console.log('Registro bem-sucedido:', newUser);
      // Redirecione o usuário após o registro bem-sucedido
      if (newUser) {
        // Salvar o usuário no localStorage (se necessário)
        localStorage.setItem('user', JSON.stringify(newUser));
        navigate('/login');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  // Função para verificar se a opção "admin" deve ser mostrada
  const showAdminOption = email.startsWith('admin@');

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Cadastro</h2>
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="role">Tipo de Usuário:</label>
        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="cliente">Cliente</option>
          <option value="empresa">Empresa</option>
          {showAdminOption && <option value="admin">Admin</option>} {/* Opção Admin aparece condicionalmente */}
        </select>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroPage;
