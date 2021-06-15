import http from "./https-common";

const baseUrl = '/environment';

class EnvironmentService {
    getAll() {
        return http.get(`${baseUrl}/all`);
    }
    
    get(id) {
        return http.get(`${baseUrl}/${id}`);
    }

    create(data) {
        return http.post(`${baseUrl}/`, data);
    }

    update(id, data) {
        return http.put(`${baseUrl}/${id}`, data);
    }

    delete(id) {
        return http.delete(`${baseUrl}/${id}`);
    }
}

export default new EnvironmentService();