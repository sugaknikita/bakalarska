package sk.tuke.static_ampacity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
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
    public Map<String, Double> calculate(@RequestBody Request request) {
        double result = calculatingService.processRequest(request);
        return Collections.singletonMap("slr", result);
    }
}
