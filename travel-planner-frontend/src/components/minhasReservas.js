import React, { useState, useEffect } from 'react';
import localService from '../services/localService';

const MinhasReservas = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const userEmail = JSON.parse(localStorage.getItem('user')).email;
                const response = await localService.getLocaisByClient(userEmail); // Isso buscará todos os locais inicialmente
                const filteredData = response.data;
                setReservas(filteredData); // Filtrar apenas locais reservados pelo usuário logado
            } catch (error) {
                console.error('Erro ao buscar reservas:', error);
            }
        };

        fetchReservas();
    }, []);

    return (
        <div>
            <h1>Minhas Reservas</h1>
            <table>
                <thead>
                    <tr>
                        <th>Local</th>
                        <th>Empresa</th>
                        <th>Endereço</th>
                        <th>Preço</th>
                        <th>Horário de Funcionamento</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva, index) => (
                        <tr key={index}>
                            <td>{reserva.nome}</td>
                            <td>{reserva.empresa}</td>
                            <td>{reserva.endereco}</td>
                            <td>{`R$ ${reserva.preco.toFixed(2)}`}</td>
                            <td>{reserva.horarioFuncionamento}</td>
                            <td>{reserva.descricao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MinhasReservas;
