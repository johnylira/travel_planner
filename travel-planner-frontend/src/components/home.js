import React, { useState, useEffect } from 'react';
import localService from '../services/localService';

const Home = () => {
    const [locais, setLocais] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetchLocais();
        checkLoginStatus();
    }, []);

    const fetchLocais = async () => {
        try {
            const response = await localService.getAllLocais();
            setLocais(response.data);
        } catch (error) {
            console.error('Erro ao buscar locais:', error);
        }
    };

    const checkLoginStatus = () => {
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleReserve = async (local) => {
        if (!isLoggedIn) {
            alert('Você precisa estar logado para fazer uma reserva.');
            return;
        }
        const updatedLocal = {
            ...local,
            reserva: false,
            client: JSON.parse(localStorage.getItem('user')).email
        };
        try {
            await localService.updateLocal(local.id, updatedLocal);
            fetchLocais(); // Refresh local data to reflect changes
        } catch (error) {
            console.error('Failed to update the local!', error);
        }
    };

    const filteredData = locais.filter(local =>
        local.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Página Inicial</h1>
            <input
                type="text"
                placeholder="Pesquisar locais ou empresas"
                value={searchTerm}
                onChange={handleChange}
            />
            <table>
                <thead>
                    <tr>
                        <th>Local</th>
                        <th>Endereço</th>
                        <th>Preço</th>
                        <th>Horário de Funcionamento</th>
                        <th>Descrição</th>
                        <th>Reserva</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(item => (
                        <tr key={item.id}>
                            <td>{item.nome}</td>
                            <td>{item.endereco}</td>
                            <td>{`R$ ${item.preco.toFixed(2)}`}</td>
                            <td>{item.horarioFuncionamento}</td>
                            <td>{item.descricao}</td>
                            <td>
                                {item.reserva ? (
                                    <button onClick={() => handleReserve(item)}>
                                        Reserva disponível
                                    </button>
                                ) : (
                                    "Indisponível"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
