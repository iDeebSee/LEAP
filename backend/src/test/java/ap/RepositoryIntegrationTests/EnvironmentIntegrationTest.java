package ap.RepositoryIntegrationTests;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import java.util.Optional;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import ap.be.backend.BackendApplication;
import ap.be.backend.models.Environment;
import ap.be.backend.repositories.EnvirenmentRepository;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = BackendApplication.class)
public class EnvironmentIntegrationTest {
    
    @Autowired
    EnvirenmentRepository envirenmentRepository;

    @Test
    public void EnvironmentTest() throws Exception{
        Environment env = new Environment();
        env.setId("1");
        env.setName("env1");
        env.setDescription("integration testing env1");


        envirenmentRepository.save(env);
        
        Optional<?> queryResult = envirenmentRepository.findById("1");
        assertFalse(queryResult.isEmpty());
        assertNotNull(queryResult.get());
   
    }
}
