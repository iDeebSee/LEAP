package ap.be.backend.dtos.editdtos;

import java.util.List;

import javax.validation.constraints.NotBlank;

import ap.be.backend.dtos.readdtos.LinkedCapabilityReadDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class StrategyItemEditDto {
    
    @NotBlank
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String strategy;

    private List<LinkedCapabilityReadDto> linkedCapabilities;
}
