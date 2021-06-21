import http from "./https-common";

class BussinesProcesService {
    getAll() {
        return http.get("/bussinesproces");
    }
    
    get(id) {
        return http.get(`/bussinesproces/${id}`);
    }

    create(data) {
        return http.post("/bussinesproces", data);
    }

    update(id, data) {
        return http.put(`/bussinesproces/${id}`, data);
    }

    delete(id) {
        return http.delete(`/bussinesproces/${id}`);
    }

    deleteAll() {
        return http.delete("/bussinesproces")
    }
}

export default new BussinesProcesService();