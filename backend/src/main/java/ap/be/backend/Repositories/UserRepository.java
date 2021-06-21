package ap.be.backend.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ap.be.backend.models.User;

@Repository
public interface UserRepository extends MongoRepository<User, String>{
        Optional<User> findByName(String name);

        Optional<User> findByEmail(String email);

        Boolean existsByName(String name);

        Boolean existsByEmail(String email);

        Optional<User> findByNameAndEmail(String name, String email);

        Boolean existsByNameAndEmail(String name, String email);
}
