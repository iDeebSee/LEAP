package ap.be.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {
    
    private String message;

    private Object data;

    public MessageResponse(String message) {
        this.message = message;
    }
}
