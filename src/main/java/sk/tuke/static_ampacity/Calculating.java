package sk.tuke.static_ampacity;

import org.springframework.stereotype.Service;
import sk.tuke.static_ampacity.models.Conductor;
import sk.tuke.static_ampacity.models.Enviroment;
import sk.tuke.static_ampacity.models.Request;

import java.util.HashMap;
import java.util.Map;

@Service
public class Calculating {

    private static final Map<String, Conductor> CATALOG = new HashMap<>();

    static {
        CATALOG.put("ACSR_243",          new Conductor("ACSR 243",           21.0,  3.50, 1.20e-4,  4.03e-3, 90));
        CATALOG.put("ACSS_FLICKER",      new Conductor("ACSS Flicker",       22.0,  3.60, 1.30e-4,  4.03e-3, 200));
        CATALOG.put("ACCC_LISBON",       new Conductor("ACCC Lisbon",        21.8,  3.40, 1.10e-4,  4.03e-3, 180));

        CATALOG.put("122-AL1/20-ST1A",   new Conductor("122-AL1/20-ST1A",   15.5,  2.44, 2.376e-4, 4.03e-3, 80));
        CATALOG.put("119-AL1/42-ST1A",   new Conductor("119-AL1/42-ST1A",   16.5,  2.05, 2.435e-4, 4.03e-3, 80));
        CATALOG.put("122-AL1/71-ST1A",   new Conductor("122-AL1/71-ST1A",   18.0,  3.60, 2.364e-4, 4.03e-3, 80));
        CATALOG.put("183-AL1/43-ST1A",   new Conductor("183-AL1/43-ST1A",   19.5,  2.79, 1.576e-4, 4.03e-3, 80));
        CATALOG.put("184-AL1/30-ST1A",   new Conductor("184-AL1/30-ST1A",   19.0,  3.00, 1.571e-4, 4.03e-3, 80));
        CATALOG.put("212-AL1/49-ST1A",   new Conductor("212-AL1/49-ST1A",   21.0,  3.00, 1.363e-4, 4.03e-3, 80));
        CATALOG.put("243-AL1/39-ST1A",   new Conductor("243-AL1/39-ST1A",   21.8,  3.45, 1.188e-4, 4.03e-3, 80));
        CATALOG.put("352-AL1/59-ST1A",   new Conductor("352-AL1/59-ST1A",   26.5,  4.00, 8.21e-5,  4.03e-3, 80));
        CATALOG.put("362-AL1/59-ST1A",   new Conductor("362-AL1/59-ST1A",   26.7,  4.21, 7.98e-5,  4.03e-3, 80));
        CATALOG.put("382-AL1/49-ST1A",   new Conductor("382-AL1/49-ST1A",   27.0,  3.00, 7.58e-5,  4.03e-3, 80));
        CATALOG.put("430-AL1/100-ST1A",  new Conductor("430-AL1/100-ST1A",  22.9,  4.27, 6.73e-5,  4.03e-3, 80));
        CATALOG.put("434-AL1/56-ST1A",   new Conductor("434-AL1/56-ST1A",   28.8,  3.20, 6.66e-5,  4.03e-3, 80));
        CATALOG.put("490-AL1/64-ST1A",   new Conductor("490-AL1/64-ST1A",   30.6,  3.40, 5.90e-5,  4.03e-3, 80));
        CATALOG.put("565-AL1/72-ST1A",   new Conductor("565-AL1/72-ST1A",   32.9,  3.65, 5.12e-5,  4.03e-3, 80));
        CATALOG.put("679-AL1/86-ST1A",   new Conductor("679-AL1/86-ST1A",   36.0,  4.00, 4.26e-5,  4.03e-3, 80));
        CATALOG.put("758-AL1/43-ST1A",   new Conductor("758-AL1/43-ST1A",   36.5,  4.12, 3.82e-5,  4.03e-3, 80));

        CATALOG.put("185-AL1/43-ST6C",   new Conductor("185-AL1/43-ST6C",   19.6,  2.80, 1.565e-4, 4.03e-3, 80));
        CATALOG.put("326-AL1/86-ST6C",   new Conductor("326-AL1/86-ST6C",   26.4,  3.60, 8.89e-5,  4.03e-3, 80));
        CATALOG.put("362-AL1/59-ST6C",   new Conductor("362-AL1/59-ST6C",   26.7,  4.21, 7.98e-5,  4.03e-3, 80));
        CATALOG.put("490-AL1/64-ST6C",   new Conductor("490-AL1/64-ST6C",   30.6,  3.40, 5.90e-5,  4.03e-3, 80));

        CATALOG.put("185-AL4/43-ST6C",   new Conductor("185-AL4/43-ST6C",   19.6,  2.80, 1.805e-4, 3.60e-3, 80));
        CATALOG.put("234-AL4/55-ST6C",   new Conductor("234-AL4/55-ST6C",   22.1,  3.15, 1.426e-4, 3.60e-3, 80));

        CATALOG.put("66-A20SA",          new Conductor("66-A20SA",          10.5,  2.10, 1.3102e-3,4.03e-3, 80));
        CATALOG.put("93-A20SA",          new Conductor("93-A20SA",          12.5,  2.50, 9.245e-4, 4.03e-3, 80));

        CATALOG.put("24-AL1/4-ST1A",     new Conductor("24-AL1/4-ST1A",    6.72,  2.24, 1.212e-3, 4.03e-3, 80));
        CATALOG.put("37-AL1/6-ST1A",     new Conductor("37-AL1/6-ST1A",    8.40,  2.80, 7.757e-4, 4.03e-3, 80));
        CATALOG.put("47-AL1/8-ST1A",     new Conductor("47-AL1/8-ST1A",    9.45,  3.15, 6.129e-4, 4.03e-3, 80));
        CATALOG.put("66-AL1/11-ST1A",    new Conductor("66-AL1/11-ST1A",   11.4,  1.80, 4.365e-4, 4.03e-3, 80));
        CATALOG.put("92-AL1/16-ST1A",    new Conductor("92-AL1/16-ST1A",   13.58, 2.12, 3.147e-4, 4.03e-3, 80));
        CATALOG.put("128-AL1/22-ST1A",   new Conductor("128-AL1/22-ST1A",  16.0,  2.50, 2.263e-4, 4.03e-3, 80));

        CATALOG.put("42-AL1/7-ST1A",     new Conductor("42-AL1/7-ST1A",    9.00,  3.00, 6.757e-4, 4.03e-3, 80));
        CATALOG.put("42-AL1/25-ST1A",    new Conductor("42-AL1/25-ST1A",   10.6,  2.12, 6.817e-4, 4.03e-3, 80));
        CATALOG.put("72-AL1/11-ST1A",    new Conductor("72-AL1/11-ST1A",   12.0,  1.95, 4.028e-4, 4.03e-3, 80));
        CATALOG.put("AlFe 70/11-1",      new Conductor("AlFe 70/11-1",     11.7,  3.75, 4.332e-4, 4.03e-3, 80));
        CATALOG.put("100-AL1/25-ST1A",   new Conductor("100-AL1/25-ST1A",  14.6,  2.06, 2.891e-4, 4.03e-3, 80));
        CATALOG.put("110-AL1/22-ST1A",   new Conductor("110-AL1/22-ST1A",  14.96, 2.24, 2.618e-4, 4.03e-3, 80));
        CATALOG.put("143-AL1/25-ST1A",   new Conductor("143-AL1/25-ST1A",  16.96, 2.65, 2.014e-4, 4.03e-3, 80));
    }

    public double processRequest(Request request) {
        Conductor conductor = CATALOG.get(request.getSelection());

        if (conductor == null) throw new IllegalArgumentException("Unknown conductor type: " + request.getSelection());

        return calculateAmpacity(conductor, request.getEnviroment());
    }

    public double calculateAmpacity(Conductor con, Enviroment env) {

        if (env.getT_s() == null || env.getT_a() == null ||
                env.getWind_speed() == null || env.getWind_angle_of_attack() == null ||
                env.getI_t0() == null || env.getY() == null) {
            return 0.0;
        }

        // moje conštanty pre vypočtu
        double D_m = con.getOutDiameter() * 1e-3;
        double d_m = con.getStrandDiameter() * 1e-3;
        double Ts = env.getT_s();
        double Ta = env.getT_a();
        double wind_speed = env.getWind_speed();
        double wind_angle = env.getWind_angle_of_attack();

        // Solárne žiarenie / Calculate solar heating [W/m]
        double Ps = con.getAbsorptivity() * env.getI_t0() * D_m;

        // Teplota filmu vzduchu v kontakte s povrchom / Temperature of air film in contact with surface [°C]
        double Tf = 0.5 * (Ts + Ta);

        // Tepelná vodivosť vzduchu / Thermal conductivity of air [W/(m*K)]
        double lambda_f = 2.368e-2 + 7.23e-5 * Tf - 2.763e-8 * Math.pow(Tf, 2);

        // Hustota vzduchu pri danej teplote filmu a nadmorskej výške / Density of air at given film temperature and elevation [kg/m^3]
        double gamma = (1.293 - 1.525e-4 * env.getY() + 6.379e-9 * Math.pow(env.getY(), 2)) / (1 + 0.00367 * Tf);

        // Dynamická viskozita vzduchu pri teplote filmu / Dynamic viscosity of air at film temperature [kg/(m*s)]
        double mi_f = (17.239 + 4.635e-2 * Tf - 2.03e-5 * Math.pow(Tf, 2)) * 1e-6;

        // Kinematická viskozita vzduchu / Kinematic viscosity of air [m^2/s]
        double ni_f = mi_f / gamma;

        double Pc;

        // Hrubosť povrchu vodiča / Roughness of conductor surface
        double Rs = d_m / (2 * (D_m - d_m));

        // Reynoldsovo číslo / Reynolds number
        double Re = wind_speed * D_m / ni_f;

        // Koeficient n, CIGRE 601, Tabuľka 4 / Coefficient n, CIGRE 601, Table 4
        double B = 0.0;
        double n = 0.0;

        if (Rs <= 0.05) {
            if (Re >= 100 && Re <= 2650) {
                B = 0.641;
                n = 0.471;
            } else if (Re > 2650 && Re <= 50000) {
                B = 0.178;
                n = 0.633;
            }
        } else if (Rs > 0.05) {
            if (Re >= 100 && Re <= 2650) {
                B = 0.641;
                n = 0.471;
            } else if (Re > 2650 && Re <= 50000) {
                B = 0.048;
                n = 0.800;
            }
        }

        // Nusseltovo číslo (Morgan) / Nusselt number (Morgan)
        double Nu_mi_90 = B * Math.pow(Re, n);

        // Nusseltovo číslo s uhľom nárazu / Nusselt number with angle of attack
        double Nu_mi_delta;
        double sinWind = Math.sin(Math.toRadians(wind_angle));

        if (wind_angle > 24) {
            Nu_mi_delta = Nu_mi_90 * (0.42 + 0.58 * Math.pow(sinWind, 0.90));
        } else {
            Nu_mi_delta = Nu_mi_90 * (0.42 + 0.68 * Math.pow(sinWind, 1.08));
        }


        // Konv. tepelná strata (Nusseltovo číslo s uhľom nárazu) / Convective heat loss (Nusselt number with angle of attack) [W/m]
        double Pc_forced = Math.PI * lambda_f * (Ts - Ta) * Nu_mi_delta;

        // Sklon k horizontále / Inclination [°]
        double beta = 0;

        // Tiažové zrýchlenie / Acceleration due to gravity [m/s^2]
        double g = 9.81;

        // Grashofovo číslo / Grashof number
        double Gr = (Math.pow(D_m, 3) * (Ts - Ta) * g) / ((Tf + 273) * Math.pow(ni_f, 2));

        // Prandtlovo číslo/ Prandtl number
        double Pr = 1005 * mi_f / lambda_f;

        // Koeficienty "A" a "m" / Coefficients for calculating natural convective heat transfer
        double Gr_Pr = Gr * Pr;
        double A, m;
        if (Gr_Pr >= 1e-1 && Gr_Pr < 1e2) {
            A = 1.02;
            m = 0.148;
        } else if (Gr_Pr >= 1e2 && Gr_Pr < 1e4) {
            A = 0.850;
            m = 0.188;
        } else if (Gr_Pr >= 1e4 && Gr_Pr < 1e7) {
            A = 0.480;
            m = 0.250;
        } else {
            A = 0.125;
            m = 0.333;
        }
        // Nusseltovo číslo z koeficientov "Gr" a "Pr" / Nusselt number (Grashof and Prandtl numbers)
        double N_mi_nat = A * Math.pow(Gr_Pr, m);

        // Nusseltovo číslo vrátane bety / Nusselt number (from β)
        double N_mi_beta = N_mi_nat;
        if (beta < 60) {
            N_mi_beta = N_mi_nat * (1 - 1.58e-4 * Math.pow(beta, 1.5));
        } else if (beta < 80) {
            N_mi_beta = N_mi_nat * (1 - 1.76e-6 * Math.pow(beta, 2.5));
        }

        // Convective heat loss (Nusselt number) [W/m]
        double P_c_nat = Math.PI * lambda_f * (Ts - Ta) * N_mi_beta;

        // Konv. tepelná strata / Convective heat loss [W/m]
        if (wind_speed >= 0.5) {
            Pc = Pc_forced;
        } else {
            Pc = P_c_nat;
        }

        // Stefan–Boltzmannova konštanta / Stefan–Boltzmann constant [W/m^2K^4]
        double sigma_B = 5.6697e-8;

        // Radiatívne chladenie / Chladenie radiáciou [W/m]
        double Pr_cool = Math.PI * D_m * sigma_B * con.getEmissivity() * (Math.pow(Ts + 273, 4) - Math.pow(Ta + 273, 4));

        // resistance at conductor temperature
        double Rac = con.getR_dc20() * (1 + con.getAlpha() * (Ts - 20));

        // net available cooling (must be positive)
        double P_net = Pc + Pr_cool - Ps;

        if (P_net > 0 && Rac > 0) {
            return Math.sqrt(P_net / Rac);
        } else {
            return 0.0;
        }
    }
}
