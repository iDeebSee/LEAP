package ap.be.backend.ControllerTests;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import ap.be.backend.models.Strategy;
import ap.be.backend.repositories.StrategyRepository;
import ap.be.backend.services.StrategyService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;


@ExtendWith(MockitoExtension.class)
public class StrategyControllerTest {
    @Mock
    private StrategyRepository strategyRepository;

    @InjectMocks
    private StrategyService strategyService;

    @Test
    void findStrategyById(){
        final String id ="1";
        final Strategy strategy = new Strategy("Strategy test1", null);

        given(strategyRepository.findById(id)).willReturn(Optional.of(strategy));

        final Optional<Strategy> expected  = strategyService.findStrategyById(id);
        assertThat(expected).isNotNull();
    }

    @Test
    void returnAllStrategies() {
        
        List<Strategy> strategies = new ArrayList<>();
        strategies.add(new Strategy("Strategy test1", null));
        strategies.add(new Strategy("Strategy test2", null));
        strategies.add(new Strategy("Strategy test3", null));
        strategies.add(new Strategy("Strategy test4", null));

        given(strategyRepository.findAll()).willReturn(strategies);

        List<Strategy> expected = strategyService.findAllStrategies();

        assertEquals(expected, strategies);
    }

    @Test
    void updateStrategy() {
        final Strategy strategy = new Strategy("Strategy test1", null);

        given(strategyRepository.save(strategy)).willReturn(strategy);

        final Strategy expected = strategyService.updateStrategy(strategy);

        assertThat(expected).isNotNull();

        verify(strategyRepository).save(any(Strategy.class));
    }

    @Test
    void DeleteStrategy() {
        final String id="1";

        strategyService.deleteStrategyById(id);
        strategyService.deleteStrategyById(id);
        
        verify(strategyRepository, times(2)).deleteById(id);
        
    }

    @Test
    void addStrategy() {
        final Strategy strategy = new Strategy("Strategy test1", null);

        given(strategyRepository.save(strategy)).willAnswer(invocation -> invocation.getArgument(0));

        Strategy savedStrategy = strategyService.addStrategy(strategy);

        assertThat(savedStrategy).isNotNull();

        verify(strategyRepository).save(any(Strategy.class));
        

    }
}
