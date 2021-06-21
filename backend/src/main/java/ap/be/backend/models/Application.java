package ap.be.backend.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import ap.be.backend.dtos.readdtos.LinkedCapabilityReadDto;
import com.mongodb.lang.NonNull;

import lombok.ToString;
import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@ToString
@Getter @Setter
@NoArgsConstructor
@Document(collection = "Applications")
public class Application {


/** 
 * @return String
 */


/** 
 * @return String
 */

/** 
 * @return String
 */

/** 
 * @return String
 */

/** 
 * @return String
 */

/** 
 * @return double
 */

/** 
 * @return double
 */

/** 
 * @return LocalDate
 */

/** 
 * @return LocalDate
 */

/** 
 * @return String
 */

/** 
 * @return int
 */

/** 
 * @return int
 */

/** 
 * @return int
 */

/** 
 * @return int
 */

/** 
 * @return int
 */

/** 
 * @return int
 */

/** 
 * @return int
 */

/** 
 * @return int
 */

/** 
 * @return int
 */

/** 
 * @return int
 */

/** 
 * @return int
 */

/** 
 * @return int
 */

/** 
 * @return int
 */

/** 
 * @return int
 */

/** 
 * @return int
 */

/** 
 * @return int
 */

/** 
 * @return int
 */

/** 
 * @return TIMEValue
 */
    @Id
    private String id;
    private String name;
    private String technology;
    private String version;
    private double currentTotalCostPerYear;
    private double toleratedTotalCostPerYear;
    private LocalDate acquisitionDate;
    private LocalDate endOfLife;
    private String costCurrency;
    private int importance,
            efficiencySupport,
            functionalCoverage,
            bfCorrectness,
            futurePotential,
            completeness,
            iqCorrectness,
            availability;

    private int currentScalability;
    private int expectedScalability;

    private int currentPerformance;
    private int expectedPerformance;


    private int currentSecurityLevel;
    private int expectedSecurityLevel;

    private int currentStability;
    private int expectedStability;

    private int currentValueForMoney;
    private TIMEValue timeValue;
    @DBRef
    private Environment environment;

    @DBRef
    private List<Capability> linkedCapabilities = new ArrayList<Capability>();

    /**
     * Input velden voor application. 
     * @param name naam van de applicatie.
     * @param technology 
     * @param version gebruikte versie.
     * @param currentTotalCostPerYear kost van de licentie voor het gebruik van de applicatie per jaar.
     * @param toleratedTotalCostPerYear maximum kost voor het gebruik van de applicatie per jaar.
     * @param acquisitionDate aankoopdatum van de applicatie. Er moet gekozen worden uit een date picker.
     * @param endOfLife levenseinde van de applicatie. Er moet gekozen worden uit een date picker.
     * @param currentScalability huidige schaalbaarheid van de applicatie.
     * @param expectedScalability verwachte schaalbaarheid van de applicatie.
     * @param currentPerformance huidige prestatie van de applicatie.
     * @param expectedPerformance verwachte prestatie van de applicatie.
     * @param currentSecurityLevel huidige beveiligingslevel van de applicatie.
     * @param expectedSecurityLevel verwachte beveiligingslevel van de applicatie.
     * @param currentStability huidige stabiliteit van de applicatie.
     * @param expectedStability verwachte stabiliteit van de applicatie.
     * @param currentValueForMoney huidige prijskwaliteitsverhouding van de applicatie.
     * @param timeValue tijdswaarde van de applicatie. Hier moet je een item kiezen uit de combobox.
     * @param costCurrency enum waar je een valuta kan kiezen die gebruikt wordt om de applicatie aan te kopen.
     * @param importance hoe belangrijk is dit applicatie voor ons bedrijf.
     * @param efficiencySupport hoe efficiënt de support van de developers is na development.
     */
    public Application(String name, String technology, String version,
                       double currentTotalCostPerYear, double toleratedTotalCostPerYear,@NonNull LocalDate acquisitionDate,
                       @NonNull LocalDate endOfLife, int currentScalability, int expectedScalability, int currentPerformance, int expectedPerformance,
                       int currentSecurityLevel, int expectedSecurityLevel, int currentStability, int expectedStability, int currentValueForMoney,
                       @NonNull TIMEValue timeValue, String costCurrency, int importance, int efficiencySupport, int functionalCoverage, int bfCorrectness,
                       int futurePotential, int completeness, int iqCorrectness, int availability, @NonNull Environment environment) {
        this.name = name;
        this.technology = technology;
        this.version = version;
        this.currentTotalCostPerYear = currentTotalCostPerYear;
        this.toleratedTotalCostPerYear = toleratedTotalCostPerYear;
        this.acquisitionDate = acquisitionDate;
        this.endOfLife = endOfLifeDateControl(endOfLife);
        this.currentScalability = maxRatingControl(currentScalability);
        this.expectedScalability = maxRatingControl(expectedScalability);
        this.currentPerformance = maxRatingControl(currentPerformance);
        this.expectedPerformance = maxRatingControl(expectedPerformance);
        this.currentSecurityLevel = maxRatingControl(currentSecurityLevel);
        this.expectedSecurityLevel = maxRatingControl(expectedSecurityLevel);
        this.currentStability = maxRatingControl(currentStability);
        this.expectedStability = maxRatingControl(expectedStability);
        this.currentValueForMoney = maxRatingControl(currentValueForMoney);
        this.timeValue = timeValue;
        this.costCurrency = costCurrency;
        this.importance = importance;
        this.efficiencySupport = efficiencySupport;
        this.functionalCoverage = functionalCoverage;
        this.bfCorrectness = bfCorrectness;
        this.futurePotential = futurePotential;
        this.completeness = completeness;
        this.iqCorrectness = iqCorrectness;
        this.availability = availability;
        this.environment = environment;
    }

    
    /** 
     * @param rating
     * @return int
     */
    public int maxRatingControl(int rating) {
        if (rating > 5) {
            throw new IllegalArgumentException("Rating was higher than " + 5);
        } else {
            return rating;
        }
    }

    
    /** 
     * @param date
     * @return LocalDate
     */
    public LocalDate endOfLifeDateControl(LocalDate date) {
        if (date.isBefore(this.acquisitionDate)) {
            throw new IllegalArgumentException("End of life date is before acquisition date:\nAcquisition date:\t" + this.acquisitionDate + "\nEnd of life date:\t" + date);
        } else {
            return date;
        }
    }
}
