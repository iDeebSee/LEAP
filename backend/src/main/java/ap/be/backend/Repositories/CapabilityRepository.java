package ap.be.backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ap.be.backend.models.Capability;

@Repository
public interface CapabilityRepository extends MongoRepository<Capability, String>{
    public Capability findByName(String name); 
    public void deleteByName(String name);
}
