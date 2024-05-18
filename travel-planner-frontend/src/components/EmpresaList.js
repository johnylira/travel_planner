// components/EmpresaList.js
import React, { useEffect, useState } from 'react';
import empresaService from '../services/empresaService';

const EmpresaList = ({ needsRefresh, setNeedsRefresh }) => {
    const [empresas, setEmpresas] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editNome, setEditNome] = useState('');

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const response = await empresaService.getAllEmpresas();
                setEmpresas(response.data);
                if (needsRefresh) {
                    setNeedsRefresh(false);
                }
            } catch (error) {
                console.error('There was an error fetching the empresas:', error);
            }
        };

        fetchEmpresas();
    }, [needsRefresh, setNeedsRefresh]);

    const handleEdit = (empresa) => {
        setEditId(empresa.id);
        setEditNome(empresa.nome);
    };

    const handleSave = async (id) => {
        try {
            await empresaService.updateEmpresa(id, { nome: editNome });
            setEditId(null);
            setEditNome('');
            setNeedsRefresh(true); // Refresh list to show updated data

        } catch (error) {
            console.error('Failed to save the empresa!', error);
        }
    };

    const handleCancel = () => {
        setEditId(null);
        setEditNome('');
    };

    return (
        <div>
            <h1>Empresas</h1>
            <ul>
                {empresas.map(empresa => (
                    <li key={empresa.id}>
                        {editId === empresa.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editNome}
                                    onChange={(e) => setEditNome(e.target.value)}
                                />
                                <button onClick={() => handleSave(empresa.id)}>Salvar</button>
                                <button onClick={handleCancel}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                {empresa.nome}
                                <button onClick={() => handleEdit(empresa)}>Editar</button>
                                <button onClick={() => empresaService.deleteEmpresa(empresa.id).then(() => setNeedsRefresh(true))}>Remover</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {/* Uncomment if you want a refresh button */}
            {/* <button onClick={() => setNeedsRefresh(true)}>Atualizar Lista</button> */}
        </div>
    );
};

export default EmpresaList;
