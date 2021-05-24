package ap.be.backend.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import ap.be.backend.models.Role;
import ap.be.backend.models.RolesEnum;

public interface RoleRepository extends MongoRepository<Role, String>{
    Optional<Role> findByName(RolesEnum name);
}
