import http from "../https-common";

class EnvironmentService {
    getAll() {
        return http.get("/environment");
    }
    
    get(id) {
        return http.get(`/environment/${id}`);
    }

    create(data) {
        return http.post("/environment", data);
    }

    update(id, data) {
        return http.put(`/environment/${id}`, data);
    }

    delete(id) {
        return http.delete(`/environment/${id}`);
    }

    deleteAll() {
        return http.delete("/environment")
    }
}

export default new EnvironmentService();