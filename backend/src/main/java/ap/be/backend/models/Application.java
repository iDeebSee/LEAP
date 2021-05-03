package ap.be.backend.models;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Applications")
public class Application {
    
    @Id
    private String id;
    private String name;
    private String technology;
    private String version;
    private double currentTotalCostPerYear;
    private double toleratedTotalCostPerYear;
    private LocalDate acquisitionDate;
    private LocalDate endOfLife;

    private final int MAX_RATING = 5;

    private int currentScalability;
    private int expectedScalability;

    private int currentPerformance;
    private int expectedPerformance;

    private int currentSecurityLevel;
    private int expectedSecurityLevel;

    private int currentStability;
    private int expectedStability;

    private int currentValueForMoney;


    public Application() {}

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
     *
     */
    public Application(String name, String technology, String version, 
    double currentTotalCostPerYear, double toleratedTotalCostPerYear, LocalDate acquisitionDate, 
    LocalDate endOfLife, int currentScalability, int expectedScalability, int currentPerformance, int expectedPerformance,
    int currentSecurityLevel, int expectedSecurityLevel,  int currentStability, int expectedStability, int currentValueForMoney ) {
        this.name = name;
        this.technology = technology;
        this.version = version;
        this.currentTotalCostPerYear= currentTotalCostPerYear;
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
    }

   

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getTechnology() {
        return technology;
    }

    public void setTechnology(String technology) {
        this.technology = technology;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public double getCurrentTotalCostPerYear() {
        return currentTotalCostPerYear;
    }

    public void setCurrentTotalCostPerYear(double currentTotalCostPerYear) {
        this.currentTotalCostPerYear = currentTotalCostPerYear;
    }

    public double getToleratedTotalCostPerYear() {
        return toleratedTotalCostPerYear;
    }

    public void setToleratedTotalCostPerYear(double toleratedTotalCostPerYear) {
        this.toleratedTotalCostPerYear = toleratedTotalCostPerYear;
    }

    public LocalDate getAcquisitionDate() {
        return acquisitionDate;
    }

    public void setAcquisitionDate(LocalDate acquisitionDate) {
        this.acquisitionDate = acquisitionDate;
    }

    public LocalDate getEndOfLife() {
        return endOfLife;
    }

    public void setEndOfLife(LocalDate endOfLife) {
        this.endOfLife = endOfLife;
    }

    public int getMAX_RATING() {
        return MAX_RATING;
    }

    public int getCurrentScalability() {
        return currentScalability;
    }

    public void setCurrentScalability(int currentScalability) {
        this.currentScalability = currentScalability;
    }

    public int getExpectedScalability() {
        return expectedScalability;
    }

    public void setExpectedScalability(int expectedScalability) {
        this.expectedScalability = expectedScalability;
    }

    public int getCurrentPerformance() {
        return currentPerformance;
    }

    public void setCurrentPerformance(int currentPerformance) {
        this.currentPerformance = currentPerformance;
    }

    public int getExpectedPerformance() {
        return expectedPerformance;
    }

    public void setExpectedPerformance(int expectedPerformance) {
        this.expectedPerformance = expectedPerformance;
    }

    public int getCurrentSecurityLevel() {
        return currentSecurityLevel;
    }

    public void setCurrentSecurityLevel(int currentSecurityLevel) {
        this.currentSecurityLevel = currentSecurityLevel;
    }

    public int getExpectedSecurityLevel() {
        return expectedSecurityLevel;
    }

    public void setExpectedSecurityLevel(int expectedSecurityLevel) {
        this.expectedSecurityLevel = expectedSecurityLevel;
    }

    public int getCurrentStability() {
        return currentStability;
    }

    public void setCurrentStability(int currentStability) {
        this.currentStability = currentStability;
    }

    public int getExpectedStability() {
        return expectedStability;
    }

    public void setExpectedStability(int expectedStability) {
        this.expectedStability = expectedStability;
    }

    public int getCurrentValueForMoney() {
        return currentValueForMoney;
    }

    public void setCurrentValueForMoney(int currentValueForMoney) {
        this.currentValueForMoney = currentValueForMoney;
    }

    public int maxRatingControl(int rating){
        if (rating > MAX_RATING){
            throw new IllegalArgumentException("Rating was higher than " + getMAX_RATING());
        }else{
            return rating;
        }
    }

    public LocalDate endOfLifeDateControl(LocalDate date){
        if (date.isBefore(this.getAcquisitionDate())){
            throw new IllegalArgumentException("End of life date is before acquisition date:\nAcquisition date:\t"+getAcquisitionDate()+"\nEnd of life date:\t"+date);
        }else{
            return date;
        }
    }

    @Override
    public String toString() {
        return "Application{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", technology='" + technology + '\'' +
                ", version='" + version + '\'' +
                ", currentTotalCostPerYear=" + currentTotalCostPerYear +
                ", toleratedTotalCostPerYear=" + toleratedTotalCostPerYear +
                ", acquisitionDate=" + acquisitionDate +
                ", endOfLife=" + endOfLife +
                ", MAX_RATING=" + MAX_RATING +
                ", currentScalability=" + currentScalability +
                ", expectedScalability=" + expectedScalability +
                ", currentPerformance=" + currentPerformance +
                ", expectedPerformance=" + expectedPerformance +
                ", currentSecurityLevel=" + currentSecurityLevel +
                ", expectedSecurityLevel=" + expectedSecurityLevel +
                ", currentStability=" + currentStability +
                ", expectedStability=" + expectedStability +
                ", currentValueForMoney=" + currentValueForMoney +
                '}';
    }
}
