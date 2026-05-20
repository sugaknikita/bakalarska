package sk.tuke.static_ampacity;

import javafx.application.Application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StaticAmpacityApplication {
    public static void main(String[] args) {
        SpringApplication.run(StaticAmpacityApplication.class, args);

        if (System.getenv("DISPLAY") != null || System.getProperty("javafx.headless") == null) {
            try {
                Application.launch(DesktopApp.class, args);
            } catch (Exception e) {
                System.out.println("JavaFX not available: " + e.getMessage());
            }
        }
    }
}
