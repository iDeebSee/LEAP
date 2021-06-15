import http from "./https-common";

class ResourcesService {
    getAll() {
        return http.get("/resources/");
    }

    get(id) {
        return http.get(`/resources/${id}`);
    }

    create(data) {
        return http.post("/resources/", data);
    }

    update(id, data) {
        return http.put(`/resources/${id}`, data);
    }

    delete(id) {
        return http.delete(`/resources/${id}`);
    }
}

export default new ResourcesService();