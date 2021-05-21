import http from "../https-common";

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
            .catch(e =>{
                console.error(e);
            })
    }

    logout() {
        localStorage.removeItem("user");
        window.location.reload();
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