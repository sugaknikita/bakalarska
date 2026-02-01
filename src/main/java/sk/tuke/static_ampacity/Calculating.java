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

        CATALOG.put("ACSR_243", new Conductor("ACSR 243-AL1/39-ST1A", 21.0, 3.5, 0.00012,4e-3, 90));
        CATALOG.put("ACSS_FLICKER", new Conductor("ACSS Flicker 242", 22.0, 3.6, 0.00013,4e-3, 200));
        CATALOG.put("ACCC_LISBON", new Conductor("ACCC Lisbon 250", 21.8, 3.4, 0.00011,4.03e-3, 180));
    }

    public double processRequest(Request request) {
        Conductor conductor = CATALOG.get(request.getSelection());

        if (conductor == null) throw new IllegalArgumentException("Unknown conductor type: " + request.getSelection());

        return calculateAmpacity(conductor, request.getEnviroment());
    }

    public double calculateAmpacity(Conductor con, Enviroment env) {

        // moje conštanty pre vypočtu
        double D_m = con.getOutDiameter() * 1e-3;
        double d_m = con.getStrandDiameter() * 1e-3;
        double Ts = con.getT_s();
        double Ta = env.getT_a();
        double wind_speed = env.getWind_speed();
        double wind_angle = env.getWind_angle_of_attack();

        // Solárne žiarenie / Calculate solar heating [W/m]
        double Ps = con.getAbsorptivity() * env.getI_t0() * D_m;

        // Teplota filmu vzduchu v kontakte s povrchom / Temperature of air film in contact with surface [°C]
        double Tf = 0.5 * (con.getT_s() + env.getT_a());

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
        if (wind_speed > 0.5) {
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
