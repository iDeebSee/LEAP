import http from "./https-common";

const baseUrl = '/strategy'
class StrategyService {
    getAll(envId) {
        return http.get(`${baseUrl}/strategies/${envId}`);
    }

    get(id) {
        return http.get(`${baseUrl}/${id}`);
    }

    create(envId, name) {
        return http.post(`${baseUrl}/${envId}`, {name});
    }

    update(envId, id, data) {
        return http.put(`${baseUrl}/${envId}/${id}`, data);
    }

    delete(envId, id) {
        return http.delete(`${baseUrl}/${envId}/${id}`);
    }
}

export default new StrategyService();