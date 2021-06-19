import http from "./https-common";

const baseUrl = '/strategyItem';

class StrategyItemService {
    getAll(strategyId) {
        return http.get(`${baseUrl}/strategyItems/${strategyId}`);
    }

    get(id) {
        return http.get(`${baseUrl}/${id}`);
    }

    create(name, strategyId, linkedCapabilities) {
        return http.post(`${baseUrl}/`, {name, strategy: strategyId, linkedCapabilities});
    }

    update(id, name, strategyId) {
        return http.put(`${baseUrl}/`, {id, name, strategy: strategyId});
    }

    delete(id) {
        return http.delete(`${baseUrl}/${id}`);
    }
}

export default new StrategyItemService();