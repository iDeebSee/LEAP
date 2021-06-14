package ap.be.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.test.context.ActiveProfiles;

import ap.be.backend.config.Profiles;

//DO NOT FORGET TO CHANGE ACTIVE PROFILE FOR PRODUCTION
@ActiveProfiles(Profiles.DEMO)
@SpringBootApplication(scanBasePackages = "ap.be.backend")
public class BackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
}
