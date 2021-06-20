package ap.be.backend.services;


import java.util.Arrays;
import java.util.HashSet;
import java.time.LocalDate;


import ap.be.backend.repositories.ApplicationRepository;
import ap.be.backend.config.Profiles;
import ap.be.backend.repositories.BussinesProcesRepository;
import ap.be.backend.models.Application;
import ap.be.backend.models.BussinesProces;
import ap.be.backend.models.TIMEValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import ap.be.backend.models.Capability;
import ap.be.backend.models.Environment;
import ap.be.backend.models.Resource;
import ap.be.backend.models.Role;
import ap.be.backend.models.Strategy;
import ap.be.backend.models.StrategyItem;
import ap.be.backend.models.User;

import ap.be.backend.repositories.CapabilityRepository;
import ap.be.backend.repositories.EnvironmentRepository;
import ap.be.backend.repositories.ResourceRepository;
import ap.be.backend.repositories.RoleRepository;
import ap.be.backend.repositories.StrategyItemRepository;
import ap.be.backend.repositories.StrategyRepository;
import ap.be.backend.repositories.UserRepository;




/*
Custom commandlinerunner om mock data in de repository te saven.
*/
@Component
@Profile(Profiles.DEMO)
public class MockDataRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MockDataRunner.class);

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private CapabilityRepository capabilityRepository;
    @Autowired
    private EnvironmentRepository environmentRepository;
    @Autowired
    private StrategyRepository strategyRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StrategyItemRepository strategyItemRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private BussinesProcesRepository bussinesProcesRepository;

    @Override
    public void run(String... args) throws Exception {
        // verwijder alles uit de database voor nieuwe test data toe te voegen

        environmentRepository.deleteAll();
        capabilityRepository.deleteAll();
        strategyRepository.deleteAll();
        roleRepository.deleteAll();
        userRepository.deleteAll();
        strategyItemRepository.deleteAll();
        bussinesProcesRepository.deleteAll();
        applicationRepository.deleteAll();
        resourceRepository.deleteAll();

        Environment env1 = new Environment("test 1");
        Environment env2 = new Environment("test 2");
        Environment env3 = new Environment("test 3");
        Environment env4 = new Environment("test 4");
        Environment env5 = new Environment("test 5");

        environmentRepository.save(env1);
        environmentRepository.save(env2);
        environmentRepository.save(env3);
        environmentRepository.save(env4);
        environmentRepository.save(env5);

        environmentRepository.findAll().forEach(env -> {
            logger.info("{}", env);
        });

        Capability capability1 = new Capability("test 1", "this is the 1st test capability", null, env1);
        Capability capability2 = new Capability("test 2", "this is the 2nd test capability", null, env1);
        Capability capability3 = new Capability("test 3", "this is the 3rd test capability", null, env1);
        Capability capability11 = new Capability("test 1.1", "this is the 1st child of the 1st test capability", capability1, env1);
        Capability capability12 = new Capability("test 1.2", "this is the 2nd child of the 1st test capability", capability1, env1);
        Capability capability111 = new Capability("test 1.1.1", "this is the 1st child of the 1st child of the 1st test capability", capability11, env1);
        Capability capability112 = new Capability("test 1.1.2", "this is the 2nd child of the 1st child of the 1st test capability", capability11, env1);
        Capability capability113 = new Capability("test 1.1.3", "this is the 3rd child of the 1st child of the 1st test capability", capability11, env1);

        capabilityRepository.save(capability1);
        capabilityRepository.save(capability2);
        capabilityRepository.save(capability3);
        capabilityRepository.save(capability11);
        capabilityRepository.save(capability12);
        capabilityRepository.save(capability111);
        capabilityRepository.save(capability112);
        capabilityRepository.save(capability113);

        capabilityRepository.findAll().forEach(cap -> {
            logger.info("{}", cap);
        });

        Strategy strategy1 = new Strategy("strategy1", env1);
        Strategy strategy2 = new Strategy("strategy2", env1);
        Strategy strategy3 = new Strategy("strategy3", env1);

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
        strategyRepository.findAll().forEach(strat ->{logger.info("{}", strat);});


        StrategyItem testitem1= new StrategyItem("test1", strategy1);
        StrategyItem testitem2= new StrategyItem("test2", strategy1);
        StrategyItem testitem3= new StrategyItem("test3", strategy1);

        strategyItemRepository.save(testitem1);
        strategyItemRepository.save(testitem2);
        strategyItemRepository.save(testitem3);
        strategyItemRepository.findAll().forEach(stratitem -> {
            logger.info("{}", stratitem);
        });
        Application application1 = new Application("App1", "technology", "version", 2.5, 5.0, LocalDate.now() ,
                LocalDate.now().plusDays(10), 5, 4, 3, 5,
        0,1, 2, 3, 5, TIMEValue.ELIMINATE,
        "euro", 5, 5, 5, 5, 5, 5, 5, 5 , env1);

        Application application2 = new Application("App2", "java", "2.5", 2.5, 5.0, LocalDate.now() ,
                LocalDate.now().plusDays(15), 5, 4, 5, 5,
                5,1, 2, 2, 5, TIMEValue.INVEST,
                "dollar", 5, 5, 5, 5, 5, 5,
                5, 5 , env1);
        
        Application application3 = new Application("App2", "javascript", "2.5", 2.5, 5.0, LocalDate.now() ,
                LocalDate.now().plusDays(15), 5, 4, 5, 5,
                5,1, 2, 2, 5, TIMEValue.INVEST,
                "dollar", 5, 5, 5, 5, 5, 5,
                5, 5 , env1);

        applicationRepository.save(application1);
        applicationRepository.save(application2);
        applicationRepository.save(application3);
        applicationRepository.findAll().forEach(app -> {
            logger.info("{}", app);
        });

        Resource resource1 = new Resource("Resource 1", "eerste resource", env1);
        Resource resource2 = new Resource("Resource 2", "tweede resource", env1);
        Resource resource3 = new Resource("Resource 3", "derde resource", env1);

        resourceRepository.save(resource1);
        resourceRepository.save(resource2);
        resourceRepository.save(resource3);

        resourceRepository.findAll().forEach(app -> {
            logger.info("{}", app);
        });

        
        
        
        BussinesProces bp1= new BussinesProces("zt","u mama zakaria");
        BussinesProces bp2= new BussinesProces("test2","zakaria is een zemmer");
        BussinesProces bp3= new BussinesProces("test3","zakaria pokemonhoofd");

        bussinesProcesRepository.save(bp1);
        bussinesProcesRepository.save(bp2);
        bussinesProcesRepository.save(bp3);
        bussinesProcesRepository.findAll().forEach(BpItem -> {
            logger.info("{}", BpItem);
        });
    }
}
