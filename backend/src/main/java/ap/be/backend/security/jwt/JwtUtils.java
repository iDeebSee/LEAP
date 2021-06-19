package ap.be.backend.security.jwt;

import org.springframework.security.core.Authentication;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import ap.be.backend.security.services.UserDetailsImpl;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${Leap.app.jwtSecret}")
    private String jwtSecret;

    @Value("${Leap.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    
    /** 
     * Genereert een Json Web Token voor een principal.
     * @param authentication stelt de token voor een geauthenticeerde principal voor.
     * @return Geeft een compacte Json Web Token terug voor een specifieke principal.
     */
    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl)authentication.getPrincipal();

        return Jwts.builder()
            .setSubject(userPrincipal.getEmail())
            .setIssuedAt(new Date())
            .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
    }

    
    /** 
     * Geeft de gebruiksnaam van een user weer op basis van zijn token.
     * @param token unieke Jason Web Token dat wordt gegenereerd voor elke user.
     * @return gebruiksnaam van die specifieke user.
     */
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    
    /** 
     * Als er iets mis is met de token wordt de fout opgevangen.
     * @param token unieke Jason Web Token dat wordt gegenereerd voor elke user.
     * @return een statusbericht afhankelijk van de juistheid van de token.
     */
    public boolean validateJwtToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}
