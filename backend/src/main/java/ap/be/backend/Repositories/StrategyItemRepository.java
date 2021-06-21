package ap.be.backend.repositories;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ap.be.backend.models.Strategy;
import ap.be.backend.models.StrategyItem;


    @Repository
    public interface StrategyItemRepository extends MongoRepository<StrategyItem, String>{
        boolean existsById(String id);

        boolean existsByStrategy(Strategy strategy);

        Optional<List<StrategyItem>> findAllByStrategy(Strategy strategy);
    }

