package ap.be.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ap.be.backend.models.Capability;
import ap.be.backend.models.Environment;

@Repository
public interface CapabilityRepository extends MongoRepository<Capability, String>{
    public boolean existsByParent(Capability parent);

    public Optional<List<Capability>> findAllByParent(Capability parent);

    public boolean existsByEnvironment(Environment environment);

    public Optional<List<Capability>> findAllByEnvironment(Environment environment);

    public boolean existsById(String id);
}
