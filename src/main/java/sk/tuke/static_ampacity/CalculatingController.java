package sk.tuke.static_ampacity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import sk.tuke.static_ampacity.models.Request;
import java.util.Collections;
import java.util.Map;

@RestController
public class CalculatingController {

    private final Calculating calculatingService;

    public CalculatingController(Calculating calculatingService) {
        this.calculatingService = calculatingService;
    }

    @PostMapping("/api/calculate")
    public ResponseEntity<?> calculate(@RequestBody Request request) {
        try {
            double result = calculatingService.processRequest(request);
            return ResponseEntity.ok(Collections.singletonMap("slr", result));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
