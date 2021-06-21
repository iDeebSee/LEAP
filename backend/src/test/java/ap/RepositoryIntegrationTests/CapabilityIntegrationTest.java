package ap.RepositoryIntegrationTests;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import ap.be.backend.BackendApplication;
import ap.be.backend.models.Capability;
import ap.be.backend.models.Environment;
import ap.be.backend.repositories.CapabilityRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = BackendApplication.class)
public class CapabilityIntegrationTest {
    @Autowired
    CapabilityRepository repository;

    @Test
    public void capabilityTest(){
        Environment env = new Environment();
        env.setId("1");
        env.setName("env1");
        Capability capability = new Capability("testcap", "testdesc", null, env);


        repository.save(capability);
        List<?> queryResult = repository.findAllByParent(null).get();
        assertFalse(queryResult.isEmpty());
        assertNotNull(queryResult.get(0));
    }
    
}
