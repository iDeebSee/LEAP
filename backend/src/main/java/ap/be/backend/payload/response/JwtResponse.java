package ap.be.backend.payload.response;

import java.util.Set;

import org.springframework.beans.factory.annotation.Value;

public class JwtResponse {
    private String accessToken;

    @Value("${Leap.app.jwtBearer}")
    private String tokenType;
    
    private String id;

    private String username;

    private String email;

    private Set<String> roles;
    

    public JwtResponse(String accessToken, String id, String username, String email, Set<String> roles) {
        this.accessToken = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}
