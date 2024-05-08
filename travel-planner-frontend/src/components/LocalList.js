import React, { useEffect, useState } from 'react';
import localService from '../services/localService';

const LocalList = () => {
    const [locais, setLocais] = useState([]);

    useEffect(() => {
        localService.getAllLocais()
            .then(response => {
                setLocais(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleDelete = (id) => {
        localService.deleteLocal(id)
            .then(() => {
                setLocais(locais.filter(local => local.id !== id));
            })
            .catch(error => {
                console.error('Failed to delete the local!', error);
            });
    };

    const handleEdit = (local) => {
        console.log('Edit', local);
    };

    return (
        <div>
            <h1>Locais</h1>
            <ul>
                {locais.map(local => (
                    <li key={local.id}>
                        {local.nome}
                        <button onClick={() => handleEdit(local)}>Editar</button>
                        <button onClick={() => handleDelete(local.id)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocalList;
