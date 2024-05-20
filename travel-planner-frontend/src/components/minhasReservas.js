import React, { useState, useEffect } from 'react';
import localService from '../services/localService';

const MinhasReservas = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await localService.getAllLocais(); // Endpoint hipotético
                setReservas(response.data.filter(({ client })=>{
                    const dono = JSON.parse(localStorage.getItem('user')).email
                    return client === dono
                })); 
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
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva, index) => (
                        <tr key={index}>
                            <td>{reserva.nome}</td>
                            <td>{reserva.empresa}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MinhasReservas;
