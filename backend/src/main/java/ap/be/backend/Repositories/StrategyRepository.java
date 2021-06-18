package ap.be.backend.repositories;


import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ap.be.backend.models.Strategy;

@Repository
public interface StrategyRepository extends MongoRepository<Strategy, String>{

    public ArrayList<String>  findStratItemList(Optional<Strategy> optional);
}

