package ap.be.backend.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ap.be.backend.repositories.StrategyRepository;
import ap.be.backend.models.Strategy;

@Service
@Transactional
public class StrategyService {

    private final StrategyRepository strategyRepository;

    @Autowired
    public StrategyService(StrategyRepository strategyRepository){
        this.strategyRepository = strategyRepository;
    }

    public List<Strategy> findAllStrategies() {
        return strategyRepository.findAll();
    }

    public Optional<Strategy> findStrategyById(String id) {
        return strategyRepository.findById(id);
    }

    public Strategy updateStrategy(Strategy strategy) {
        return strategyRepository.save(strategy);
    }
    public void deleteStrategyById(String id) {
        strategyRepository.deleteById(id);
    }

    public Strategy addStrategy(Strategy strategy) {
        return strategyRepository.save(strategy);
    }

    
}
