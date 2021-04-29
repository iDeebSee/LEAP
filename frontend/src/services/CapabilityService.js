import http from "../https-common";

class CapabilityService {
    getAll() {
        return http.get("/");
    }

    get(name) {
        return http.get(`/${name}`);
    }

    create(data) {
        return http.post("/add", data);
    }

    update(name, data) {
        return http.put(`/${name}`, data);
    }

    delete(name) {
        return http.delete(`/${name}`);
    }

    deleteAll() {
        return http.delete("/")
    }
}

export default new CapabilityService();