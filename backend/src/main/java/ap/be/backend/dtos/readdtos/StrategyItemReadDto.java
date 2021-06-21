package ap.be.backend.dtos.readdtos;

import java.util.List;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class StrategyItemReadDto {

    @NotBlank
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String strategy;

    private List<LinkedCapabilityReadDto> linkedCapabilities;
}
