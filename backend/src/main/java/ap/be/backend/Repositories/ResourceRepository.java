package ap.be.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import ap.be.backend.models.Resource;

public interface ResourceRepository extends MongoRepository<Resource,String> {
    
}
