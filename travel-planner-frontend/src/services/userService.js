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

// Novo método para buscar todos os usuários
const getAllUsers = async () => {
    try {
        const response = await api.get('/api/users');
        return response.data; // Retorna todos os usuários
    } catch (error) {
        throw error;
    }
};

// Novo método para buscar um usuário por email
const getUserByEmail = async (email) => {
    try {
        const response = await api.get('/api/users/by-email', { params: { email } });
        return response.data; // Retorna o usuário especificado
    } catch (error) {
        throw error;
    }
};

// Exemplo de método updateCliente em clientService
const updateCliente = async (id, data) => {
    try {
        const response = await api.put(`/api/clients/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Exporta todas as funções como um objeto
const userService = { login, register, getAllUsers, getUserByEmail, updateCliente };

export default userService;
