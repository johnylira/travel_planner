import React, { useState } from 'react';
import api from '../services/api';
import './AddLocal.css';
import LocalList from './LocalList';

const AddLocal = ({ onLocalAdded }) => {
  const [localData, setLocalData] = useState({
    nome: '',
    endereco: '',
    preco: '',
    horarioFuncionamento: '',
    descricao: ''
  });
  const [precoError, setPrecoError] = useState('');
  const [needsRefresh, setNeedsRefresh] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "preco") {
      if (validatePreco(value)) {
        setPrecoError(''); // Limpar mensagem de erro se o preço é válido
      } else {
        setPrecoError('Por favor, insira um valor numérico válido com ponto decimal.');
      }
    }
    setLocalData({ ...localData, [name]: value });
  };

  const validatePreco = (value) => {
    // Regex para validar se o input é um número que pode incluir um ponto decimal
    return /^[0-9]*\.?[0-9]*$/.test(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (precoError) {
      alert("Corrija os erros antes de enviar.");
      return;
    }
    try {
      const { email } = JSON.parse(localStorage.getItem('user')); // Assume o email como nome da empresa
      await api.post('/locais', { ...localData, empresa: email, reserva: true });
      console.log('Local adicionado!');
      setLocalData({
        nome: '',
        endereco: '',
        preco: '',
        horarioFuncionamento: '',
        descricao: ''
      }); // Limpar o formulário após a adição
      if (onLocalAdded) {
        onLocalAdded();
      }
    } catch (err) {
      console.error('Erro ao adicionar local', err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="add-local-form">
        <label htmlFor="nome">Nome do Local:</label>
        <input
          type="text"
          name="nome"
          value={localData.nome}
          onChange={handleChange}
        />
        <label htmlFor="endereco">Endereço:</label>
        <input
          type="text"
          name="endereco"
          value={localData.endereco}
          onChange={handleChange}
        />
        <label htmlFor="preco">Preço:</label>
        <input
          type="text"
          name="preco"
          value={localData.preco}
          onChange={handleChange}
        />
        {precoError && <div className="error">{precoError}</div>}
        <label htmlFor="horarioFuncionamento">Horário de Funcionamento:</label>
        <input
          type="text"
          name="horarioFuncionamento"
          value={localData.horarioFuncionamento}
          onChange={handleChange}
        />
        <label htmlFor="descricao">Descrição:</label>
        <textarea
          name="descricao"
          value={localData.descricao}
          onChange={handleChange}
          rows="4"
        />
        <button type="submit">Adicionar Local</button>
      </form>
      <LocalList needsRefresh={needsRefresh} setNeedsRefresh={setNeedsRefresh} />
    </>
  );
};

export default AddLocal;