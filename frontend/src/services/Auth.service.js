import http from "../https-common";

class AuthService {
    login(email, password) {
        return http.post(`/signin`, {
                email,
                password
            })

    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return http.post("/register", {
        username,
        email,
        password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();