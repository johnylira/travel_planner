// src/services/userService.js
import api from './api';

const login = async (email, password) => {
    try {
        const response = await api.post('/api/users/login', { email, password });
        return response.data; // Retorna os dados do usuário se o login for bem-sucedido
    } catch (error) {
        throw error; // Lança o erro para ser tratado pelo componente que chama essa função
    }
};

const register = async (userData) => {
    try {
        const response = await api.post('/api/users/register', userData);
        return response.data; // Retorna os dados do usuário recém-registrado
    } catch (error) {
        throw error;
    }
};

export default { login, register };
