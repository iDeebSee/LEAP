package ap.be.backend.models;

public enum RolesEnum {
    USER,
    ADMIN;

    public RolesEnum fromValue(String name) {
        return RolesEnum.valueOf(name.toUpperCase());
    }
}
