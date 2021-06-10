package ap.be.backend.repositories;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ap.be.backend.models.StrategyItem;


    @Repository
    public interface StrategyItemRepository extends MongoRepository<StrategyItem, String>{
        boolean existsById(String id);
    }

