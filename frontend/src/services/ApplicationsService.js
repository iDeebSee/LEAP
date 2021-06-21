import http from "./https-common";

class ApplicationsService {
    getAll(envId) {
        return http.get(`/applications/applications/${envId}`);
    }

    getTimeValues(){
        return http.get("/applications/timevalue")
    }

    get(id) {
        return http.get(`/applications/application/${id}`);
    }

    create(envId, data, linkedCapabilities) {
        return http.post("/applications/application", envId, data, linkedCapabilities);
    }

    update( id, data) {
        return http.put(`/applications/application/${id}`, data);
    }

    delete(id) {
        return http.delete(`/applications/application/${id}`);
    }

}

export default new ApplicationsService();