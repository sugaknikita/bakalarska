package sk.tuke.static_ampacity.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Request {
    @JsonProperty("enviroment")
    public Enviroment weather;

    @JsonProperty("selection")
    public String selection;

    public Request() {}

    public String getSelection() { return selection; }
    public void setSelection(String selection) { this.selection = selection; }

    public Enviroment getEnviroment() { return weather; }
    public void setEnviroment(Enviroment weather) { this.weather = weather; }

}
