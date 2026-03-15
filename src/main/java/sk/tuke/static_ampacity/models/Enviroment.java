package sk.tuke.static_ampacity.models;

public class Enviroment {
    private double t_s;
    private double t_a;
    private double wind_speed;
    private double wind_angle_of_attack;
    private double i_t0;
    private double y;

    public double getT_s() { return t_s; }
    public void setT_s(double t_s) { this.t_s = t_s; }

    public double getT_a() { return t_a; }
    public void setT_a(double t_a) { this.t_a = t_a; }

    public double getWind_speed() { return wind_speed; }
    public void setWind_speed(double wind_speed) { this.wind_speed = wind_speed; }

    public double getWind_angle_of_attack() { return wind_angle_of_attack; }
    public void setWind_angle_of_attack(double wind_angle_of_attack) { this.wind_angle_of_attack = wind_angle_of_attack; }

    public double getI_t0() { return i_t0; }
    public void setI_t0(double i_t0) { this.i_t0 = i_t0; }

    public double getY() { return y; }
    public void setY(double y) { this.y = y; }
}
