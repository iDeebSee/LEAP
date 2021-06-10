import http from "./https-common";

class StrategyItemService {
    getAll() {
        return http.get("/strategyItem");
    }

    get(id) {
        return http.get(`/strategyItem/${id}`);
    }

    create(data) {
        return http.post("/strategyItem", data);
    }

    update(id, data) {
        return http.put(`/strategyItem/${id}`, data);
    }

    delete(id) {
        return http.delete(`/strategyItem/${id}`);
    }
}

export default new StrategyItemService();