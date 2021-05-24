import http from "../https-common";

class ApplicationsService {
    getAll() {
        return http.get("/application/");
    }

    getTimeValues(){
        return http.get("/application/timevalue")
    }

    get(id) {
        return http.get(`/application/${id}`);
    }

    create(data) {
        return http.post("/application", data);
    }

    update(id, data) {
        return http.put(`/application/${id}`, data);
    }

    delete(id) {
        return http.delete(`/application/${id}`);
    }

    deleteAll() {
        return http.delete("/application/")
    }
}

export default new ApplicationsService();