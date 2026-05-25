package sk.tuke.static_ampacity.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Request {
    @JsonProperty("enviroment")
    public Enviroment weather;

    @JsonProperty("selection")
    public String selection;

    @JsonProperty("emissivity")
    public double emissivity = 0.5;

    @JsonProperty("absorptivity")
    public double absorptivity = 0.5;

    public Request() {}

    public String getSelection() { return selection; }
    public void setSelection(String selection) { this.selection = selection; }

    public Enviroment getEnviroment() { return weather; }
    public void setEnviroment(Enviroment weather) { this.weather = weather; }

    public double getEmissivity() { return emissivity; }
    public void setEmissivity(double emissivity) { this.emissivity = emissivity; }

    public double getAbsorptivity() { return absorptivity; }
    public void setAbsorptivity(double absorptivity) { this.absorptivity = absorptivity; }

}
