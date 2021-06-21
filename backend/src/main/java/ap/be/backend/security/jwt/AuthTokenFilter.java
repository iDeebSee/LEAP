package ap.be.backend.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import ap.be.backend.security.services.UserDetailsServiceImpl;

public class AuthTokenFilter extends OncePerRequestFilter{
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Value("${Leap.app.tokenBearer}")
    private String bearer;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    
    /** 
     * Vraagt de hele request header op om ze daarna te ontleden en de JSON Web Token eruit te halen.
     * @param request nodig om de request header te kunnen aanvragen.
     * @return geeft de JSON Web Token terug.
     */
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if(StringUtils.hasText(headerAuth) && headerAuth.startsWith(bearer + " ")) {
            return headerAuth.substring(7, headerAuth.length());
        }

        return null;
    }

    
    /** 
     * Controleert of de gebruiker en token bij elkaar horen.
     * @param request interface dat wordt gebruikt om authenticatie details aan te vragen.
     * @param response interface dat wordt gebruikt om HTTP specifieke functionaliteiten binnen te krijgen. 
     * @param filterChain vuurt de volgende filter in de kettingreactie af.
     * @throws ServletException wordt afgevuurd bij een algemene fout.
     * @throws IOException wordt afgevuurd bij gefaalde of onderbroken i/o processen.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);
            if(jwt != null && jwtUtils.validateJwtToken(jwt)) {
                String username = jwtUtils.getUserNameFromJwtToken(jwt);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }

        filterChain.doFilter(request, response);
        
    }
}
