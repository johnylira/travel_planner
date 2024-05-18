import React, { useState, useCallback } from 'react';
import api from '../services/api';
import ClientList from './ClientList';  // Importação correta

const ClientAdd = () => {
  const [nome, setNome] = useState('');
  const [needsRefresh, setNeedsRefresh] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/clients', { nome });
      setNome('');
      setNeedsRefresh(true);  // Atualiza para forçar o ClientList a recarregar
    } catch (err) {
      console.error('Erro ao adicionar cliente', err);
    }
  };

  const handleClientAdded = useCallback(() => {
    setNeedsRefresh(false);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome do Cliente:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button type="submit">Adicionar Cliente</button>
      </form>
      <ClientList needsRefresh={needsRefresh} setNeedsRefresh={handleClientAdded} />
    </>
  );
};

export default ClientAdd;
