package ap.be.backend.repositories;


import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ap.be.backend.models.BussinesProces;
import ap.be.backend.models.Environment;

@Repository
public interface BussinesProcesRepository extends MongoRepository<BussinesProces,String> {
    public boolean existsById(String id);

    public boolean existsByEnvironment(Environment environment);

    public Optional<List<BussinesProces>> findAllByEnvironment(Environment environment);
}
