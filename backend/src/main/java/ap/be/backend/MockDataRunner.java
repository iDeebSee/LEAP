package ap.be.backend;

import ap.be.backend.Repositories.ApplicationRepository;
import ap.be.backend.models.Application;
import ap.be.backend.models.TIMEValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import ap.be.backend.Repositories.CapabilityRepository;
import ap.be.backend.models.Capability;

import java.time.LocalDate;


/*
Custom commandlinerunner om mock data in de repository te saven.
*/
@Component
public class MockDataRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MockDataRunner.class);

    @Autowired 
    private CapabilityRepository capabilityRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    public void run(String... args) throws Exception {
        applicationRepository.deleteAll();
//        capabilityRepository.deleteAll();
//
//        Capability capability1 = new Capability("test 1", "this is the 1st test capability"),
//        capability2 = new Capability("test 2", "this is the 2nd test capability"),
//        capability3 = new Capability("test 3", "this is the 3rd test capability"),
//        capability11 = new Capability("test 1.1", "this is the 1st child of the 1st test capability", capability1),
//        capability12 = new Capability("test 1.2", "this is the 2nd child of the 1st test capability", capability1),
//        capability111 = new Capability("test 1.1.1", "this is the 1st child of the 1st child of the 1st test capability", capability11),
//        capability112 = new Capability("test 1.1.2", "this is the 2nd child of the 1st child of the 1st test capability", capability11),
//        capability113 = new Capability("test 1.1.3", "this is the 3rd child of the 1st child of the 1st test capability", capability11);
//
//        capabilityRepository.save(capability1);
//        capabilityRepository.save(capability2);
//        capabilityRepository.save(capability3);
//        capabilityRepository.save(capability11);
//        capabilityRepository.save(capability12);
//        capabilityRepository.save(capability111);
//        capabilityRepository.save(capability112);
//        capabilityRepository.save(capability113);
//
//        capabilityRepository.findAll().forEach(cap -> {
//            logger.info("{}",cap);
//        });

        Application application = new Application("word", "bla", "bla", 2.0,
                4.5, LocalDate.now(), LocalDate.of(2022, 03, 15 ),
                5, 5, 5, 5, 5,
                5, 0, 1, 2, TIMEValue.ELIMINATE);

        applicationRepository.save(application);

        applicationRepository.findAll().forEach(app  -> {
            logger.info("{}", app);
        });
    }
}
