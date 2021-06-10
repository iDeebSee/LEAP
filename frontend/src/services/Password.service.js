import http from "./https-common";

const urlBase = '/password';

class PasswordService {

    requestEdit(data) {
        return http.post(`${urlBase}/edit/request_edit`, data);
    }

    checkEditToken(token) {
        return http.get(`${urlBase}/edit/check_token/${token}`);
    }

    editPassword(data) {
        return http.put(`${urlBase}/edit/edit_password`, data)
    }

    requestCreation(name, email) {
        return http.post(`${urlBase}/create/request_creation`, {name: name, email: email});
    }

    checkCreateToken(token) {
        return http.get(`${urlBase}/create/check_token/${token}`);
    }

    createPassword(data) {
        return http.put(`${urlBase}/create/create_password`, data);
    }
}

export default new PasswordService();