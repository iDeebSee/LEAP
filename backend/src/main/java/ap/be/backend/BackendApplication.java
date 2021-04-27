package ap.be.backend;

import org.springframework.context.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import ap.be.backend.jpa.Capability;
import ap.be.backend.jpa.CapabilityRepository;

@SpringBootApplication
public class BackendApplication {

	

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	//mock data for the front end
	//this is purely to test the frontend, do not forget to remove after the view has been tested
	@Autowired
	private CapabilityRepository repository;

	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return (args) -> {
			Capability capability1 = new Capability("test 1","this is the 1st test capability");
			repository.save(capability1);
			Capability capability2 = new Capability("test 2","this is the 2nd test capability");
			repository.save(capability2);
			Capability capability21 = new Capability("test 2.1","this is the 1st child of the 2nd test capability", capability2);
			repository.save(capability21);
			Capability capability3 = new Capability("test 3","this is the 3rd test capability");
			repository.save(capability3);
		};
	} 
}
