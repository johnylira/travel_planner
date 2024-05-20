import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';

const CadastroPage = () => {
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    password: '',
    cpf: '',
    telefone: '',
    nacionalidade: '',
    role: 'cliente'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const newUser = await userService.register(userData);
      console.log('Registro bem-sucedido:', newUser);
      if (newUser) {
        localStorage.setItem('user', JSON.stringify(newUser));
        navigate('/login');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  const showAdminOption = userData.email.startsWith('admin@');

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Cadastro</h2>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          name="nome"
          placeholder="Digite seu nome"
          value={userData.nome}
          onChange={handleChange}
        />
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={userData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          value={userData.password}
          onChange={handleChange}
        />
        <label htmlFor="cpf">CPF:</label>
        <input
          type="text"
          name="cpf"
          placeholder="Digite seu CPF"
          value={userData.cpf}
          onChange={handleChange}
        />
        <label htmlFor="telefone">Telefone:</label>
        <input
          type="text"
          name="telefone"
          placeholder="Digite seu telefone"
          value={userData.telefone}
          onChange={handleChange}
        />
        <label htmlFor="nacionalidade">Nacionalidade:</label>
        <input
          type="text"
          name="nacionalidade"
          placeholder="Digite sua nacionalidade"
          value={userData.nacionalidade}
          onChange={handleChange}
        />
        <label htmlFor="role">Tipo de Usuário:</label>
        <select name="role" value={userData.role} onChange={handleChange}>
          <option value="cliente">Cliente</option>
          <option value="empresa">Empresa</option>
          {showAdminOption && <option value="admin">Admin</option>}
        </select>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroPage;
