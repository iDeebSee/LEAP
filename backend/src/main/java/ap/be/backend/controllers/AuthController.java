package ap.be.backend.controllers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import ap.be.backend.dtos.createdtos.UserCreateDto;
import ap.be.backend.dtos.editdtos.UserEditDto;
import ap.be.backend.dtos.readdtos.UserReadDto;
import ap.be.backend.models.Role;
import ap.be.backend.models.RolesEnum;
import ap.be.backend.models.User;
import ap.be.backend.payload.request.LoginRequest;
import ap.be.backend.payload.response.JwtResponse;
import ap.be.backend.payload.response.MessageResponse;
import ap.be.backend.repositories.RoleRepository;
import ap.be.backend.repositories.UserRepository;
import ap.be.backend.security.jwt.JwtUtils;
import ap.be.backend.security.services.UserDetailsImpl;
import ap.be.backend.services.mappers.UserMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
public class AuthController {
    @Autowired
    UserMapper userMapper;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/roles")
    public ResponseEntity<List<String>> getRoles() {
        List<String> roles = new ArrayList<String>();
        roleRepository.findAll().forEach(role -> roles.add(role.getName().name().toLowerCase()));
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserReadDto>> getUsers() {
        List<UserReadDto> users = new ArrayList<UserReadDto>();
        userRepository.findAll().forEach(user -> users.add(userMapper.convertToDTO(user.getId())));
        return ResponseEntity.ok(users);
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl)authentication.getPrincipal();
        Set<String> roles = userDetails.getAuthorities().stream()
            .map(item -> item.getAuthority())
            .collect(Collectors.toSet());

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
    }

    @PostMapping("/register")
    public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody UserCreateDto newUser) {
        if(userRepository.existsByName(newUser.getName())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if(userRepository.existsByEmail((newUser.getEmail()))) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email already in use!"));
        }

        User user = new User(newUser.getName(), newUser.getEmail(), null);

        Set<String> strRoles = newUser.getRoles();
        Set<Role> roles = new HashSet<Role>();

        if(strRoles == null) {
            Role userRole = roleRepository.findByName(RolesEnum.USER)
                .orElseThrow(() -> new RuntimeException("Error: Role not found"));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(RolesEnum.ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role not found"));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(RolesEnum.USER)
                            .orElseThrow(() -> new RuntimeException("Error: Role not found"));
                        roles.add(userRole);
                        break;
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully"));
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<MessageResponse> editUser(@PathVariable("id") String id, @Valid @RequestBody UserEditDto newUser ) {
        try {
            User user = userRepository.findById(id).orElseThrow(RuntimeException::new);

            user.setName(newUser.getName());
            user.setEmail(newUser.getEmail());

            Set<String> strRoles = newUser.getRoles();
            Set<Role> roles = new HashSet<Role>();

            if(strRoles == null) {
                Role userRole = roleRepository.findByName(RolesEnum.USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role not found"));
                roles.add(userRole);
            } else {
                strRoles.forEach(role -> {
                    switch (role) {
                        case "admin":
                            Role adminRole = roleRepository.findByName(RolesEnum.ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role not found"));
                            roles.add(adminRole);
                            break;
                        default:
                            Role userRole = roleRepository.findByName(RolesEnum.USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role not found"));
                            roles.add(userRole);
                            break;
                    }
                });
            }
            user.setRoles(roles);
            userRepository.save(user);
            return ResponseEntity.ok(new MessageResponse("User edited successfully!"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to edit user"));
        }

    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<MessageResponse> deleteUser(@PathVariable("id") String id) {
        if(userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("User was successfully deleted!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("No user with that id could be found"));
        }
    }
}
