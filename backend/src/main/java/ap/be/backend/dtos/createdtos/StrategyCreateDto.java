package ap.be.backend.dtos.createdtos;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class StrategyCreateDto {
    
    @NotBlank
    private String name;

    @NotBlank
    private String environment;
}
