// src/Home.js
import React, { useState } from 'react';
import data from '../mock/mockHome'

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.locaisEmpresas.filter(entry =>
        entry.local.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.empresa.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <th>Nome</th>
                        <th>Empresa</th>
                        <th>Reserva</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(item => (
                        <tr key={item.id}>
                            <td>{item.local}</td>
                            <td>{item.empresa}</td>
                            <td>
                                <button disabled={!item.disponivel}>
                                    {item.disponivel ? "Reservar" : "Indisponível"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
