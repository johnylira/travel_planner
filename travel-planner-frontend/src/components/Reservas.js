// src/components/Reservas.js
import React from 'react';
import reservas from '../mock/reservasMock'; // Ajuste o caminho conforme necessário

const Reservas = () => {
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
                    {reservas.map(reserva => (
                        <tr key={reserva.id}>
                            <td>{reserva.local}</td>
                            <td>{reserva.cliente}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reservas;
