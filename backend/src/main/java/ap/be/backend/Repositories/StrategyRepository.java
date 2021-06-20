package ap.be.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ap.be.backend.models.Environment;
import ap.be.backend.models.Strategy;

@Repository
public interface StrategyRepository extends MongoRepository<Strategy, String>{
    public boolean existsById(String id);

    public boolean existsByEnvironment(Environment environment);

    public Optional<List<Strategy>> findAllByEnvironment(Environment environment);
}