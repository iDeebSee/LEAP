export const ProtectedAdmin = {
    isAdmin: false,

    authenticate() {
        this.isAdmin = true;
    },

    LogOut() {
        this.isAdmin = false;
    },

    getAuth() {
        return this.isAdmin;
    }
}