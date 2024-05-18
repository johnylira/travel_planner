// components/AddEmpresa.js
import React, { useState } from 'react';
import api from '../services/api';
import './AddEmpresa.css';
import EmpresaList from './EmpresaList';  // Importe o EmpresaList

const AddEmpresa = ({needsRefresh, setNeedsRefresh}) => {
  const [nome, setNome] = useState('');
  const [refresh, setRefresh] = useState(false);  // Estado para controlar a atualização da lista

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/empresas', { nome });
      console.log('Empresa adicionada!');
      setNome('');
      setRefresh(!refresh);  // Alterne o estado de refresh para reativar o fetch no EmpresaList
    } catch (err) {
      console.error('Erro ao adicionar empresa', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome da Empresa:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button type="submit">Adicionar Empresa</button>
      </form>
      <EmpresaList needsRefresh={needsRefresh} setNeedsRefresh={setNeedsRefresh} />
    </div>
  );
};

export default AddEmpresa;
