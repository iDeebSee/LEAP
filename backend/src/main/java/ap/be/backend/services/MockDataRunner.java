package ap.be.backend.services;

import java.util.Arrays;
import java.util.HashSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import ap.be.backend.models.Capability;
import ap.be.backend.models.Environment;
import ap.be.backend.models.Role;
import ap.be.backend.models.Strategy;
import ap.be.backend.models.User;
import ap.be.backend.repositories.CapabilityRepository;
import ap.be.backend.repositories.EnvironmentRepository;
import ap.be.backend.repositories.RoleRepository;
import ap.be.backend.repositories.StrategyRepository;
import ap.be.backend.repositories.UserRepository;


/*
Custom commandlinerunner om mock data in de repository te saven.
*/
@Component
public class MockDataRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MockDataRunner.class);

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired 
    private CapabilityRepository capabilityRepository;
    @Autowired
    private EnvironmentRepository envirenmentRepository;
    @Autowired 
    private StrategyRepository strategyRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired 
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
       //verwijder alles uit de database voor nieuwe test data toe te voegen.g
        capabilityRepository.deleteAll();
        envirenmentRepository.deleteAll();
        strategyRepository.deleteAll();
        roleRepository.deleteAll();
        userRepository.deleteAll();

        Capability capability1 = new Capability("test 1", "this is the 1st test capability", null);
        Capability capability2 = new Capability("test 2", "this is the 2nd test capability", null);
        Capability capability3 = new Capability("test 3", "this is the 3rd test capability", null);
        Capability capability11 = new Capability("test 1.1", "this is the 1st child of the 1st test capability", capability1);
        Capability capability12 = new Capability("test 1.2", "this is the 2nd child of the 1st test capability", capability1);
        Capability capability111 = new Capability("test 1.1.1", "this is the 1st child of the 1st child of the 1st test capability", capability11);
        Capability capability112 = new Capability("test 1.1.2", "this is the 2nd child of the 1st child of the 1st test capability", capability11);
        Capability capability113 = new Capability("test 1.1.3", "this is the 3rd child of the 1st child of the 1st test capability", capability11);


        capabilityRepository.save(capability1);
        capabilityRepository.save(capability2);
        capabilityRepository.save(capability3);
        capabilityRepository.save(capability11);
        capabilityRepository.save(capability12);
        capabilityRepository.save(capability111);
        capabilityRepository.save(capability112);
        capabilityRepository.save(capability113);

        capabilityRepository.findAll().forEach(cap -> {
            logger.info("{}",cap);
        });

        Environment env1= new Environment("test 1", "this is the 1st test envirement");
        Environment env2= new Environment("test 2", "this is the 2st test envirement");
        Environment env3= new Environment("test 3", "this is the 3st test envirement");
        Environment env4= new Environment("test 4", "this is the 4st test envirement");
        Environment env5= new Environment("test 5", "this is the 5st test envirement");

        envirenmentRepository.save(env1);
        envirenmentRepository.save(env2);
        envirenmentRepository.save(env3);
        envirenmentRepository.save(env4);
        envirenmentRepository.save(env5);

        envirenmentRepository.findAll().forEach(env -> {
            logger.info("{}",env);
        });
        
        Strategy strategy1 = new Strategy("strategy1");
        Strategy strategy2 = new Strategy("strategy2");
        Strategy strategy3 = new Strategy("strategy3");

        strategyRepository.save(strategy1);
        strategyRepository.save(strategy2);
        strategyRepository.save(strategy3);

        strategyRepository.findAll().forEach(strat -> {
            logger.info("{}", strat);
        });

        Role adminRole = new Role("ADMIN");
        Role userRole = new Role("USER");
        roleRepository.save(adminRole);
        roleRepository.save(userRole);

        User adminUser = new User("admin", "admin@email.com", passwordEncoder.encode(new StringBuffer("secret")));
        adminUser.setRoles(new HashSet<Role>(Arrays.asList(adminRole, userRole)));

        User normalUser = new User("user", "user@email.com", passwordEncoder.encode(new StringBuffer("secret")));
        normalUser.setRoles(new HashSet<Role>(Arrays.asList(userRole)));

        User jonas = new User("Jonas", "s108159@ap.be", passwordEncoder.encode(new StringBuffer("Mj/1Ud%E")));
        jonas.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
        
        userRepository.save(adminUser);
        userRepository.save(normalUser);
        userRepository.save(jonas);
    }
    
}
