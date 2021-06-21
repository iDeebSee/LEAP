package ap.RepositoryIntegrationTests;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import ap.be.backend.BackendApplication;
import ap.be.backend.models.TIMEValue;
import ap.be.backend.repositories.ApplicationRepository;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;


import ap.be.backend.models.Application;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.util.Optional;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = BackendApplication.class)
public class ApplicationIntegrationTest {
     @Autowired
     private ApplicationRepository applicationRepository;

    @Test
    public void ApplicationTest() throws Exception {
        Application app = new Application();
        app.setId("1");
        app.setName("app1");
        app.setAcquisitionDate(LocalDate.now());
        app.setEndOfLife(LocalDate.now().plusDays(10));
        app.setTimeValue(TIMEValue.ELIMINATE);


        applicationRepository.save(app);

        Optional<?> queryResult = applicationRepository.findById("1");
        assertFalse(queryResult.isEmpty());
        assertNotNull(queryResult.get());


    }
}