// components/ClientList.js
import React, { useEffect, useState } from 'react';
import clienteService from '../services/clientService'

const ClientList = ({ needsRefresh, setNeedsRefresh }) => {
    const [clientes, setClientes] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editNome, setEditNome] = useState('');
    const [editEmail, setEditEmail] = useState(''); // Para edição de email também

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await clienteService.getAllClientes();
                setClientes(response.data);
                if (needsRefresh) {
                    setNeedsRefresh(false);
                }
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            }
        };

        fetchClientes();
    }, [needsRefresh, setNeedsRefresh]);

    const handleEdit = (cliente) => {
        setEditId(cliente.id);
        setEditNome(cliente.nome);
        setEditEmail(cliente.email); // Manipulando email também
    };

    const handleSave = async () => {
        try {
            await clienteService.updateCliente(editId, { nome: editNome, email: editEmail });
            setEditId(null);
            setEditNome('');
            setEditEmail('');
            setNeedsRefresh(true);
        } catch (error) {
            console.error('Erro ao salvar o cliente:', error);
        }
    };

    const handleCancel = () => {
        setEditId(null);
        setEditNome('');
        setEditEmail('');
    };

    return (
        <div>
            <h1>Clientes</h1>
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.id}>
                        {editId === cliente.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editNome}
                                    onChange={(e) => setEditNome(e.target.value)}
                                />
                                <input
                                    type="email"
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                />
                                <button onClick={handleSave}>Salvar</button>
                                <button onClick={handleCancel}>Cancelar</button>
                            </div>
                        ) : (
                            <div>
                                {cliente.nome} ({cliente.email})
                                <button onClick={() => handleEdit(cliente)}>Editar</button>
                                <button onClick={() => clienteService.deleteCliente(cliente.id).then(() => setNeedsRefresh(true))}>Remover</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;

