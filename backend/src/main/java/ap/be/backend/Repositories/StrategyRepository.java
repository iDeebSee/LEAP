package ap.be.backend.repositories;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ap.be.backend.models.Strategy;

@Repository
public interface StrategyRepository extends MongoRepository<Strategy, String>{
}

