import React, { useEffect, useState } from 'react';
import userService from '../services/userService';

const ClientList = () => {
    const [clientes, setClientes] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editRole, setEditRole] = useState('');

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            const response = await userService.getAllUsers();
            setClientes(response);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    };

    const handleEdit = (cliente) => {
        setEditId(cliente.id);
        setEditRole(cliente.role);
    };

    const handleSave = async (id) => {
        try {
            console.log('oioi')
            await userService.updateCliente(id, { role: editRole });
            setEditId(null);
            fetchClientes(); // Refresh the list after saving
        } catch (error) {
            console.error('Erro ao salvar o cliente:', error);
        }
    };

    const handleCancel = () => {
        setEditId(null);
    };

    return (
        <div>
            <h1>Clientes</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Role</th>
                        {/* <th>Ações</th> */}
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.email}</td>
                            <td>
                                {editId === cliente.id ? (
                                    <select value={editRole} onChange={(e) => setEditRole(e.target.value)}>
                                        <option value="cliente">Cliente</option>
                                        <option value="empresa">Empresa</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                ) : (
                                    cliente.role
                                )}
                            </td>
                            {/* <td>
                                {editId === cliente.id ? (
                                    <>
                                        <button onClick={() => handleSave(cliente.id)}>Salvar</button>
                                        <button onClick={handleCancel}>Cancelar</button>
                                    </>
                                ) : (
                                    <button onClick={() => handleEdit(cliente)}>Editar</button>
                                )}
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientList;
