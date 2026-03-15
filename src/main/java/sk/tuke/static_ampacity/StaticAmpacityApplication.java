package sk.tuke.static_ampacity;

import javafx.application.Application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StaticAmpacityApplication {
	public static void main(String[] args) {
		SpringApplication.run(StaticAmpacityApplication.class, args);

        Application.launch(DesktopApp.class, args);
	}
}
