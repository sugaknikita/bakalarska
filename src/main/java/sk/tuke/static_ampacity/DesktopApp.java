package sk.tuke.static_ampacity;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.concurrent.Worker;
import javafx.scene.Scene;
import javafx.scene.web.WebView;
import javafx.stage.Stage;

public class DesktopApp extends Application {

    private WebView webView;

    private void callSetWindowSize() {
        try {
            double w = webView.getWidth();
            double h = webView.getHeight();
            if (w > 0 && h > 0) {
                Object exists = webView.getEngine().executeScript(
                        "typeof setWindowSize === 'function'"
                );
                if (Boolean.TRUE.equals(exists)) {
                    webView.getEngine().executeScript(
                            "setWindowSize(" + w + ", " + h + ")"
                    );
                }
            }
        } catch (Exception e) {
        }
    }

    @Override
    public void start(Stage stage) {
        webView = new WebView();
        webView.getEngine().load("http://localhost:8080");

        webView.getEngine().getLoadWorker().stateProperty().addListener((obs, oldState, newState) -> {
            if (newState == Worker.State.SUCCEEDED) {
                Platform.runLater(() -> Platform.runLater(this::callSetWindowSize));
            }
        });

        webView.widthProperty().addListener((obs, o, n) -> Platform.runLater(this::callSetWindowSize));
        webView.heightProperty().addListener((obs, o, n) -> Platform.runLater(this::callSetWindowSize));

        stage.setTitle("Static Ampacity Calculator");
        stage.setScene(new Scene(webView, 1500, 850));
        stage.setResizable(true);

        stage.setOnCloseRequest(e -> {
            Platform.exit();
            System.exit(0);
        });

        stage.show();
    }
}