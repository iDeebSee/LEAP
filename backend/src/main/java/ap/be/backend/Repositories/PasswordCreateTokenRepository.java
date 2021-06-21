package ap.be.backend.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import ap.be.backend.models.PasswordCreateToken;

public interface PasswordCreateTokenRepository extends MongoRepository<PasswordCreateToken, String>{
    Optional<PasswordCreateToken> findByToken(String token);

    boolean existsByToken(String token);

    void deleteByToken(String token);
}
