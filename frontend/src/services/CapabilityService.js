import http from "../https-common";

class CapabilityService {
    getAll() {
        return http.get("/");
    }

    get(id) {
        return http.get(`/${id}`);
    }

    create(data) {
        return http.post("/add", data);
    }

    update(id, data) {
        return http.put(`/${id}`, data);
    }

    delete(id) {
        return http.delete(`/${id}`);
    }

    deleteAll() {
        return http.delete("/")
    }
}

export default new CapabilityService();