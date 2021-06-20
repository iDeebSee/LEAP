package ap.be.backend.repositories;

import ap.be.backend.models.*;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResourceRepository extends MongoRepository<Resource,String> {
    public boolean existsById(String id);

    public boolean existsByEnvironment(Environment environment);

    public Optional<List<Resource>> findAllByEnvironment(Environment environment);
}
