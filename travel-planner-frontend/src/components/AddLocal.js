import React, { useState } from 'react';
import api from '../services/api';
import './AddLocal.css';

const AddLocal = () => {
    const [nome, setNome] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        api.post('/locais', { nome })
            .then(res => {
                console.log('Local adicionado!');
                setNome(''); // Limpar o input após a adição
            })
            .catch(err => {
                console.error('Erro ao adicionar local', err);
            });
    };

    return (
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
    );
};

export default AddLocal;
