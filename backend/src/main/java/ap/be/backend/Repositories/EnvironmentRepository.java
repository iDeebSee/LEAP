package ap.be.backend.repositories;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


import ap.be.backend.models.Environment;



@Repository
public interface EnvironmentRepository extends MongoRepository<Environment,String> {
    public boolean existsById(String id);
}
    

