import React, { useEffect, useState } from 'react';
import localService from '../services/localService';

const LocalList = ({ needsRefresh, setNeedsRefresh }) => {
    const [locais, setLocais] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editNome, setEditNome] = useState('');

    useEffect(() => {
        const fetchLocais = async () => {
            try {
                const response = await localService.getAllLocais();
                setLocais(response.data);
                if (needsRefresh) {
                    setNeedsRefresh(false);
                }
            } catch (error) {
                console.error('There was an error fetching the locais:', error);
            }
        };

        fetchLocais();
    }, [needsRefresh, setNeedsRefresh]);


    const handleEdit = (local) => {
        setEditId(local.id);
        setEditNome(local.nome);
    };

    const handleSave = async (id) => {
        try {
            await localService.updateLocal(id, { nome: editNome });
            setEditId(null);
            setEditNome('');
            setNeedsRefresh(true); // Refresh list to show updated data
        } catch (error) {
            console.error('Failed to save the local!', error);
        }
    };

    const handleCancel = () => {
        setEditId(null);
        setEditNome('');
    };

    return (
        <div>
            <h1>Locais</h1>
            <ul>
                {locais.map(local => (
                    <li key={local.id}>
                        {editId === local.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editNome}
                                    onChange={(e) => setEditNome(e.target.value)}
                                />
                                <button onClick={() => handleSave(local.id)}>Salvar</button>
                                <button onClick={handleCancel}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                {local.nome}
                                <button onClick={() => handleEdit(local)}>Editar</button>
                                <button onClick={() => localService.deleteLocal(local.id).then(() => setNeedsRefresh(true))}>Remover</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <button onClick={() => setNeedsRefresh(true)}>Atualizar Lista</button>
        </div>
    );
};

export default LocalList;
