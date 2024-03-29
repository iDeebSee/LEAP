package ap.be.backend.dtos.createdtos;

import java.util.List;

import javax.validation.constraints.NotBlank;

import ap.be.backend.dtos.readdtos.LinkedCapabilityReadDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.core.env.Environment;

@Data
@ToString
@EqualsAndHashCode
public class ResourceCreateDto {
    
    @NotBlank
    private String name;

    @NotBlank
    private String description;

    private List<LinkedCapabilityReadDto> linkedCapabilities;

    @NotBlank
    private Environment environment;
}
