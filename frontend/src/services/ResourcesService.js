import http from "./https-common";

class ResourcesService {
    getAll(envId) {
        return http.get(`/resources/resources/${envId}`);
    }

    get(id) {
        return http.get(`/resources/resource/${id}`);
    }

    create(envId, data, linkedCapabilities) {
        return http.post("/resources/resource", envId, data, linkedCapabilities);
    }

    update(envId, id, data, linkedCapabilities) {
        return http.put(`/resources/resource/${id}`,envId, data, linkedCapabilities);
    }

    delete(id) {
        return http.delete(`/resources/resource/${id}`);
    }
}

export default new ResourcesService();