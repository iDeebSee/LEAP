package ap.be.backend.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "TimeValue")
public enum TIMEValue {
    TOLERATE, INVEST, ELIMINATE, MIGRATE
}
