package ap.be.backend.dtos.readdtos;

import ap.be.backend.models.TIMEValue;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.core.env.Environment;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;

@Data
@ToString
@EqualsAndHashCode
public class ApplicationReadDto {
    private String id;
    private String name;
    private String technology;
    private String version;
    private double currentTotalCostPerYear;
    private double toleratedTotalCostPerYear;
    @NotBlank
    private LocalDate acquisitionDate;
    @NotBlank
    private LocalDate endOfLife;

    private String costCurrency;
    private int importance;
    private int efficiencySupport;
    private int functionalCoverage;
    private int bfCorrectness;
    private int futurePotential;
    private int completeness;
    private int iqCorrectness;
    private int availability;
    private int currentScalability;
    private int expectedScalability;
    private int currentPerformance;
    private int expectedPerformance;
    private int currentSecurityLevel;
    private int expectedSecurityLevel;
    private int currentStability;
    private int expectedStability;
    private int currentValueForMoney;
    @NotBlank
    private TIMEValue timeValue;
    private List<LinkedCapabilityReadDto> linkedCapabilities;
    @NotBlank
    private Environment environment;
}
