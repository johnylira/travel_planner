// services/empresaService.js
import api from './api';

const empresaService = {
    getAllEmpresas() {
        return api.get('/empresas');
    },
    getEmpresaById(id) {
        return api.get(`/empresas/${id}`);
    },
    createEmpresa(empresaData) {
        return api.post('/empresas', empresaData);
    },
    updateEmpresa(id, empresaData) {
        return api.put(`/empresas/${id}`, empresaData);
    },
    deleteEmpresa(id) {
        return api.delete(`/empresas/${id}`);
    }
};

export default empresaService;
