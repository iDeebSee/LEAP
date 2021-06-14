import http from "./https-common";

const urlBase = '/capability';
class CapabilityService {
    getAll() {
        return http.get(`${urlBase}/all`);
    }

    get(id) {
        return http.get(`${urlBase}/${id}`);
    }

    create(name, description, parent) {
        return http.post(`${urlBase}/`, {name, description, parent});
    }

    update(id, data) {
        return http.put(`${urlBase}/${id}`, data);
    }

    delete(id) {
        return http.delete(`${urlBase}/${id}`);
    }
}

export default new CapabilityService();