import React, { useState, useEffect } from 'react';
import localService from '../services/localService';

const Reservas = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await localService.getAllLocais('/api/locais/reservados'); // Endpoint hipotético
                setReservas(response.data.filter(({ reserva, empresa })=>{
                    const dono = JSON.parse(localStorage.getItem('user')).email
                    return reserva===false && empresa === dono
                })); 
            } catch (error) {
                console.error('Erro ao buscar reservas:', error);
            }
        };

        fetchReservas();
    }, []);

    return (
        <div>
            <h1>Reservas</h1>
            <table>
                <thead>
                    <tr>
                        <th>Local</th>
                        <th>Cliente</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva, index) => (
                        <tr key={index}>
                            <td>{reserva.nome}</td>
                            <td>{reserva.client}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reservas;
