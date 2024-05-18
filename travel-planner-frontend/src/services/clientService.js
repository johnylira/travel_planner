import api from './api';

const clienteService = {
    getAllClientes() {
        return api.get('/clients');
    },
    getClienteById(id) {
        return api.get(`/clients/${id}`);
    },
    createCliente(clienteData) {
        return api.post('/clients', clienteData);
    },
    updateCliente(id, clienteData) {
        console.log(clienteData)
        return api.put(`/clients/${id}`, clienteData);
    },
    deleteCliente(id) {
        return api.delete(`/clients/${id}`);
    }
};

export default clienteService;
