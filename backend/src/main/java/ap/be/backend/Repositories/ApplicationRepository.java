package ap.be.backend.repositories;

import ap.be.backend.models.Application;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ApplicationRepository extends MongoRepository<Application, String> {
    public Application findByName(String name);
}










