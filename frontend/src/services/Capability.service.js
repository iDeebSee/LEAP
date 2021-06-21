import http from "./https-common";

const baseUrl = '/capability';
class CapabilityService {
    getAll(envId) {
        return http.get(`${baseUrl}/capabilities/${envId}`);
    }

    get(id) {
        return http.get(`${baseUrl}/${id}`);
    }

    getLinked(envId) {
        return http.get(`${baseUrl}/linkedCapabilities/${envId}`)
    }

    create(envId, name, description, parent) {
        return http.post(`${baseUrl}/`, {name, description, parent, environment: envId});
    }

    update(envId, id, name, description, parent) {
        return http.put(`${baseUrl}/`, {id, name, description, parent, environment: envId});
    }

    delete(id) {
        return http.delete(`${baseUrl}/${id}`);
    }
}

export default new CapabilityService();