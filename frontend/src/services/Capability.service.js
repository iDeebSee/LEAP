import http from "./https-common";

const urlBase = '/capability';
class CapabilityService {
    getAll(envId) {
        return http.get(`${urlBase}/caplist/${envId}`);
    }

    get(envId, id) {
        return http.get(`${urlBase}/${id}`);
    }

    create(envId, name, description, parent) {
        return http.post(`${urlBase}/${envId}`, {name, description, parent});
    }

    update(envId, id, name, description, parent) {
        return http.put(`${urlBase}/${envId}/${id}`, {name, description, parent});
    }

    delete(envId, id) {
        return http.delete(`${urlBase}/${envId}/${id}`);
    }
}

export default new CapabilityService();