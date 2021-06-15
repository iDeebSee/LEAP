package ap.be.backend.repositories;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ap.be.backend.models.BussinesProces;

@Repository
public interface BussinesProcesRepository extends MongoRepository<BussinesProces,String> {
    
}
