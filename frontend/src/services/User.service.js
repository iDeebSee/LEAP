import http from './https-common'

const API_URL = 'http://localhost:8080/';

class UserService {
    getPublicContent() {
        return http.get(API_URL + 'all');
    }

    getUserBoard() {
        return http.get(API_URL + 'user');
    }

    getAdminBoard() {
        return http.get(API_URL + 'admin');
    }
}

export default new UserService();