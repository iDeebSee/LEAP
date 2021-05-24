import http from "./https-common";
class AuthService {
    login(email, password) {
        return http.post(`/signin`, {
                email,
                password
            })
            .then(res => {
                if(res.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                }
                return res.data;
            })
    };

    logout() {
        localStorage.removeItem("user");
        window.location.reload();
    };

    register(name, email, password, roles) {
        return http.post("/register", {
        name,
        email,
        password,
        roles
        });
    };

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    };  

    isAdmin() {
        return this.getCurrentUser().roles.includes("ADMIN");
    }

    getRoles() {
        return http.get("roles");
    }

    getAll() {
        return http.get("/users");
    }

    update(id, data) {
        return http.put(`/user/${id}`, data)
    }

    delete(id) {
        return http.delete(`/user/${id}`);
    }
}

export default new AuthService();