package ap.be.backend.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ap.be.backend.models.PasswordResetToken;

@Repository
public interface PasswordResetTokenRepository extends MongoRepository<PasswordResetToken, String>{
    Optional<PasswordResetToken> findByToken(String token);

    Boolean existsByToken(String token);

    void deleteByToken(String token);
}
