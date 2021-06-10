package ap.be.backend.tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import ap.be.backend.dtos.UserCreateDto;
import ap.be.backend.dtos.UserDto;
import ap.be.backend.models.User;
import ap.be.backend.payload.response.MessageResponse;
import ap.be.backend.repositories.RoleRepository;
import ap.be.backend.repositories.UserRepository;
import ap.be.backend.services.UserMapper;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class AuthControllerTests {
    
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserMapper userMapper;

    private static BCryptPasswordEncoder passwordEncoder;

    private static User user;

    @BeforeAll
    public static void init() {
        passwordEncoder = new BCryptPasswordEncoder();
        user = new User("testuser", "test@user.com", passwordEncoder.encode(new StringBuffer("password")));
    }

    @Test
    public void getAllUsersTest() {
        final ResponseEntity<UserDto[]> forEntity = restTemplate.getForEntity("/users", UserDto[].class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        List<UserDto> expectedList = new ArrayList<UserDto>();
        userRepository.findAll().forEach(user -> 
        {
            expectedList.add(userMapper.convertToDTO(user.getId()));
        });
        List<UserDto> actualList = Arrays.asList(forEntity.getBody());
        assertIterableEquals(expectedList, actualList);
    }

    @Test
    public void getAllRolesTest() {
        final ResponseEntity<String[]> forEntity = restTemplate.getForEntity("/roles", String[].class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());

        List<String> expectedList = new ArrayList<String>();
        roleRepository.findAll().forEach(x -> {
            expectedList.add(x.getName().name().toLowerCase());
        });

        List<String> actualList = Arrays.asList(forEntity.getBody());
        assertIterableEquals(expectedList, actualList);
    }

    @Test
    public void createNewUserTest() {
        UserCreateDto dto = new UserCreateDto();
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        Set<String> roles = new HashSet<String>();
        user.getRoles().forEach(role -> {
            roles.add(role.getName().name().toLowerCase());
        });
        dto.setRoles(roles);
        final ResponseEntity<MessageResponse> forEntity = restTemplate.postForEntity("/register", dto, MessageResponse.class);
        assertEquals(HttpStatus.OK, forEntity.getStatusCode());
    }

    @Test
    public void userLoginTest() {

    }

    @Test
    public void editUserTest() {

    }

    @Test
    public void deleteUserTest() {

    }
}
