package ap.be.backend.models;

public class CapabilityMap {


    private Capability lvl1Capability;

    private Capability lvl2Capability;

    private Capability lvl3Capability;

    public CapabilityMap(Capability lvl1Capability, Capability lvl2Capability, Capability lvl3Capability) throws IllegalArgumentException{

        this.lvl1Capability = lvl1Capability;
        this.lvl2Capability = lvl2Capability;
        this.lvl3Capability = lvl3Capability;

    }

    
}
