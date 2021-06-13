package ap.be.backend.models;

import com.mongodb.lang.NonNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter 
@Setter
@NoArgsConstructor
@Document(collection="Resources")
public class Resource{

    @Id
    private String id;
    private String name;

    public Resource(@NonNull String name){
        this.name = name;
    }
}