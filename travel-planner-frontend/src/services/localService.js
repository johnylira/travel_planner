// localService.js
import api from './api';

const localService = {
    getAllLocais() {
        return api.get('/locais');
    },
    getLocalById(id) {
        return api.get(`/locais/${id}`);
    },
    createLocal(localData) {
        return api.post('/locais', localData);
    },
    updateLocal(id, localData) {
        return api.put(`/locais/${id}`, localData);
    },
    deleteLocal(id) {
        return api.delete(`/locais/${id}`);
    }
};

export default localService;
