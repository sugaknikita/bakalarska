package sk.tuke.static_ampacity.models;

public class Conductor {
    private String name;
    private double t_s;
    private double outDiameter;
    private double strandDiameter;
    private double r_dc20;
    private double alfa;

    private double emissivity = 0.5;
    private double absorptivity = 0.5;

    public Conductor() {}

    public Conductor(String name, double outDiam, double strDiam, double rdc20, double alfa, double ts) {
        this.name = name;
        this.outDiameter = outDiam;
        this.strandDiameter = strDiam;
        this.r_dc20 = rdc20;
        this.alfa = alfa;
        this.t_s = ts;
    }

    public double getOutDiameter() {return outDiameter;}
    public void setOutDiameter(double outDiameter) {this.outDiameter = outDiameter;}

    public double getStrandDiameter() {return strandDiameter;}
    public void setStrandDiameter(double strandDiameter) {this.strandDiameter = strandDiameter;}

    public double getR_dc20() {return r_dc20;}
    public void setR_dc20(double r_dc20) {this.r_dc20 = r_dc20;}

    public double getT_s() {return t_s;}
    public void setT_s(double t_s) {this.t_s = t_s;}

    public double getAlpha() { return alfa; }
    public void setAlpha(double alpha) { this.alfa = alpha; }

    public double getEmissivity() {return emissivity;}
    public void setEmissivity(double emissivity) {this.emissivity = emissivity;}

    public double getAbsorptivity() {return absorptivity;}
    public void setAbsorptivity(double absorptivity) {this.absorptivity = absorptivity;}

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
}
