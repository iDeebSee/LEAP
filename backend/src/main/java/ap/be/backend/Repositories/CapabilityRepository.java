package ap.be.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ap.be.backend.models.Capability;

@Repository
public interface CapabilityRepository extends MongoRepository<Capability, String>{
    public List<Capability> findAllByParent(Capability parent);

    public boolean existsById(String id);
    public Optional<Capability> findByNameAndDescription(String name, String descripton);
}
