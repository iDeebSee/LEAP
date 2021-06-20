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
        return http.post(`${baseUrl}/`, {environment: envId, name});
    }

    update(envId, id, name) {
        return http.put(`${baseUrl}/`, {environment: envId, id, name});
    }

    delete(id) {
        return http.delete(`${baseUrl}/${id}`);
    }
}

export default new StrategyService();