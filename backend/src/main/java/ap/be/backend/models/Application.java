package ap.be.backend.models;

import java.time.LocalDate;

import com.mongodb.lang.NonNull;

import lombok.ToString;
import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@ToString
@Getter @Setter
@NoArgsConstructor
@Document(collection = "Applications")
public class Application {

    @Id
    private String id;
    private String name;
    private String technology;

/** 
 * @return String
 */
    private String version;

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

    //private final int MAX_RATING = 5;

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

    /**
     * @param name
     * @param technology
     * @param version
     * @param currentTotalCostPerYear
     * @param toleratedTotalCostPerYear
     * @param acquisitionDate
     * @param endOfLife
     * @param currentScalability
     * @param expectedScalability
     * @param currentPerformance
     * @param expectedPerformance
     * @param currentSecurityLevel
     * @param expectedSecurityLevel
     * @param currentStability
     * @param expectedStability
     * @param currentValueForMoney
     * @param timeValue
     * @param costCurrency
     * @param importance
     * @param efficiencySupport
     * @param availability
     * @param bfCorrectness
     * @param completeness
     * @param functionalCoverage
     * @param futurePotential
     * @param iqCorrectness
     */
    public Application(String name, String technology, String version,
                       double currentTotalCostPerYear, double toleratedTotalCostPerYear,@NonNull LocalDate acquisitionDate,
                       @NonNull LocalDate endOfLife, int currentScalability, int expectedScalability, int currentPerformance, int expectedPerformance,
                       int currentSecurityLevel, int expectedSecurityLevel, int currentStability, int expectedStability, int currentValueForMoney,
                       @NonNull TIMEValue timeValue, String costCurrency, int importance, int efficiencySupport, int functionalCoverage, int bfCorrectness,
                       int futurePotential, int completeness, int iqCorrectness, int availability) {
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
