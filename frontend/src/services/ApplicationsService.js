import http from "./https-common";

class ApplicationsService {
    getAll() {
        return http.get("/applications/");
    }

    getTimeValues(){
        return http.get("/applications/timevalue")
    }

    get(id) {
        return http.get(`/applications/${id}`);
    }

    create(data) {
        return http.post("/applications/", data);
    }

    update(id, data) {
        return http.put(`/applications/${id}`, data);
    }

    delete(id) {
        return http.delete(`/applications/${id}`);
    }

    deleteAll() {
        return http.delete("/applications/")
    }
}

export default new ApplicationsService();