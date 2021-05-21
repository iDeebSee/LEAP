import http from "../https-common";

class StrategyService {
    getAll() {
        return http.get("/strategy");
    }

    get(id) {
        return http.get(`/strategy/${id}`);
    }

    create(data) {
        return http.post("/strategy", data);
    }

    update(id, data) {
        return http.put(`/strategy/${id}`, data);
    }

    delete(id) {
        return http.delete(`/strategy/${id}`);
    }
}

export default new StrategyService();