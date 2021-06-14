package ap.be.backend.controllers;

import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ap.be.backend.dtos.PasswordChangeDto;
import ap.be.backend.dtos.PasswordChangeRequestDto;
import ap.be.backend.models.PasswordCreateToken;
import ap.be.backend.models.PasswordResetToken;
import ap.be.backend.models.User;
import ap.be.backend.payload.response.MessageResponse;
import ap.be.backend.repositories.PasswordCreateTokenRepository;
import ap.be.backend.repositories.PasswordResetTokenRepository;
import ap.be.backend.repositories.UserRepository;
import ap.be.backend.services.MailSender;

@RestController
@RequestMapping("/password")
public class PasswordController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    PasswordCreateTokenRepository passwordCreateTokenRepository;

    @Autowired
    MailSender mailSender;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    
    @PostMapping("/edit/request_edit")
    public ResponseEntity<MessageResponse> newPassword(@Valid @RequestBody PasswordChangeRequestDto passwordChangeRequestDto) {
        if(userRepository.existsByNameAndEmail(passwordChangeRequestDto.getName(), passwordChangeRequestDto.getEmail())) {
            User user = userRepository.findByNameAndEmail(passwordChangeRequestDto.getName(), passwordChangeRequestDto.getEmail()).get();
            
            String token = UUID.randomUUID().toString();
            passwordResetTokenRepository.save(new PasswordResetToken(token, user));
            mailSender.sendMail(passwordChangeRequestDto.getEmail(), "LEAP Password reset request", "Click the following link to reset your password: \n" + "https://localhost:3000/reset_password/" + token);
            return ResponseEntity.ok(new MessageResponse("Successfully requested password reset"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find user with that name and email..."));
        }
    }

    @GetMapping("/edit/check_token/{token}")
    public ResponseEntity<MessageResponse> checkResetToken(@PathVariable("token") String token) {
        if(passwordResetTokenRepository.existsByToken(token)) {
            return ResponseEntity.ok(new MessageResponse("This token is valid!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("The reset token has expired..."));
        }
    }

    @PutMapping("/edit/edit_password")
    public ResponseEntity<MessageResponse> resetPassword(@RequestBody PasswordChangeDto passwordChangeDto) {
        if(passwordResetTokenRepository.existsByToken(passwordChangeDto.getToken())) {
            User user = passwordResetTokenRepository.findByToken(passwordChangeDto.getToken()).get().getUser();
            user.setPassword(passwordEncoder.encode(new StringBuffer(passwordChangeDto.getPassword())));
            userRepository.save(user);
            passwordResetTokenRepository.deleteByToken(passwordChangeDto.getToken());
            return ResponseEntity.ok(new MessageResponse("Successfully reset password!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("The token has expired..."));
        }
    }

    @PostMapping("/create/request_creation")
    public ResponseEntity<MessageResponse> requestPasswordCreation(@Valid @RequestBody PasswordChangeRequestDto passwordChangeRequestDto) {
        if(userRepository.existsByNameAndEmail(passwordChangeRequestDto.getName(), passwordChangeRequestDto.getEmail())) {
            User user = userRepository.findByNameAndEmail(passwordChangeRequestDto.getName(), passwordChangeRequestDto.getEmail()).get();

            String token = UUID.randomUUID().toString();
            passwordCreateTokenRepository.save(new PasswordCreateToken(token, user));
            mailSender.sendMail(passwordChangeRequestDto.getEmail(), "LEAP Password creation request", "An admin has created a LEAP account for you, please create a password to finalise account creation: \n" + "https://localhost:3000/create_password/" + token);
            return ResponseEntity.ok(new MessageResponse("Successfully requested password creation"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to find user with that name and email..."));
        }
    }

    @GetMapping("/create/check_token/{token}")
    public ResponseEntity<MessageResponse> checkCreateToken(@PathVariable("token") String token) {
        if(passwordCreateTokenRepository.existsByToken(token)) {
            return ResponseEntity.ok(new MessageResponse("This token is valid!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("The token has expired..."));
        }   
    }

    @PutMapping("/create/create_password")
    public ResponseEntity<MessageResponse> createPassword(@RequestBody PasswordChangeDto passwordChangeDto) {
        if(passwordCreateTokenRepository.existsByToken(passwordChangeDto.getToken())) {
            User user = passwordCreateTokenRepository.findByToken(passwordChangeDto.getToken()).get().getUser();
            user.setPassword(passwordChangeDto.getPassword());
            userRepository.save(user);
            passwordCreateTokenRepository.deleteByToken(passwordChangeDto.getToken());
            return ResponseEntity.ok(new MessageResponse("Successfully created password!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("The token has expired..."));
        }
    }
}
