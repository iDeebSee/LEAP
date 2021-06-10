package ap.RepositoryIntegrationTests;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import ap.be.backend.repositories.StrategyRepository;
import ap.be.backend.BackendApplication;
import ap.be.backend.models.Strategy;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = BackendApplication.class)
public class StrategyIntegrationTest {

    @Autowired
    StrategyRepository strategyRepository;

    @Test
    public void StrategyTest() throws Exception{
        Strategy strategy = new Strategy();
        strategy.setId("1");
        strategy.setName("strategy1");

        strategyRepository.save(strategy);
        
        Optional<?> queryResult = strategyRepository.findById("1");
        assertFalse(queryResult.isEmpty());
        assertNotNull(queryResult.get());
   
    }
}
