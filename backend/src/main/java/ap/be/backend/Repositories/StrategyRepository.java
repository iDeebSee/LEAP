package ap.be.backend.Repositories;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ap.be.backend.models.Strategy;


    @Repository
    public interface StrategyRepository extends MongoRepository<Strategy, String>{
        public List<Strategy> findAllByParent(Strategy parent);
    }

