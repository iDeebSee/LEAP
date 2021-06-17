package ap.be.backend.security.jwt;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {
    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    
    /** 
     * Gebruikt om de gebruiker er op aan te wijzen dat je geauthenticeerd moet zijn om een pagina te bekijken.
     * @param request aanvraag dat zorgt voor ongeldige authenticatie.
     * @param response error dat wordt teruggestuurd naar de gebruiker.
     * @param authException wordt afgevuurd bij een autorisatie fout.
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
        logger.error("Unauthorized error: {}", authException.getMessage());
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: unauthorized");
    }
}
