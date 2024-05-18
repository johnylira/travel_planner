// components/AddLocal.js
import React, { useState } from 'react';
import api from '../services/api';
import './AddLocal.css';
import LocalList from './LocalList';

const AddLocal = ({ onLocalAdded }) => { // Pass onLocalAdded prop
  const [nome, setNome] = useState('');
  const [needsRefresh, setNeedsRefresh] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/locais', { nome }); // Use async/await for clarity
      console.log('Local adicionado!');
      setNome(''); // Limpar o input após a adição
      if (onLocalAdded) { // Call onLocalAdded if prop is provided
        onLocalAdded();
      }
    } catch (err) {
      console.error('Erro ao adicionar local', err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome do Local:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button type="submit">Adicionar Local</button>
      </form>
      <LocalList needsRefresh={needsRefresh} setNeedsRefresh={setNeedsRefresh} />
    </>
  );
};

export default AddLocal;