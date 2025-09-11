package com.example.nutriengine.nutrienginemain.Controllers;

import com.example.nutriengine.nutrienginemain.Entity.*;
import com.example.nutriengine.nutrienginemain.Respositories.AdminProfileRepository;
import com.example.nutriengine.nutrienginemain.Respositories.AdminRepository;
import com.example.nutriengine.nutrienginemain.Respositories.UserRepository;
import com.example.nutriengine.nutrienginemain.Services.DietPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;


@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("diet-plan")
public class DietPlanController {

    @Value("${google.gemini.api-key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    @Autowired
    DietPlanService dietPlanService;

    @Autowired
    AdminRepository adminProfileRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    DietPlan dietPlan;
    public DietPlanController(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper; // Initialize ObjectMapper
    }

    private static final String GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/";
    private static final String GEMINI_MODEL_NAME = "gemini-1.5-flash"; // Or "gemini-pro"

    @PostMapping("/generate-diet_plan")
    public ResponseEntity<?> generateDietPlan(@RequestBody DietPlanRequest request) {

        String prompt = String.format("""
            Generate a detailed 7-day diet plan tailored to my preferences and goals.
            The response MUST be in JSON format.
            DO NOT include any markdown code block delimiters (e.g., ```json or ```).
            The JSON object should have the following structure:
            {
              "introNotes": "string", 
              "dailyPlan": {
                "day1": { "breakfast": "string", "lunch": "string", "snack": "string", "dinner": "string" },
                "day2": { "breakfast": "string", "lunch": "string", "snack": "string", "dinner": "string" },
                "day3": { "breakfast": "string", "lunch": "string", "snack": "string", "dinner": "string" },
                "day4": { "breakfast": "string", "lunch": "string", "snack": "string", "dinner": "string" },
                "day5": { "breakfast": "string", "lunch": "string", "snack": "string", "dinner": "string" },
                "day6": { "breakfast": "string", "lunch": "string", "snack": "string", "dinner": "string" },
                "day7": { "breakfast": "string", "lunch": "string", "snack": "string", "dinner": "string" }
              },
              "ingredients": {
                "category1": ["item1", "item2"],
                "category2": ["item1", "item2"],
                "category3": ["item1", "item2"],
                "category4": ["item1", "item2"],
                "category5": ["item1", "item2"],
                "category6": ["item1", "item2"],
                "category7": ["item1", "item2"]
              },
              "importantNotes": ["note1", "note2"],
              "closingNote": "string"
            }

            Ensure that the 'snack' field is included even if empty, or adjusted based on meal frequency.
            Populate all fields accurately based on the following parameters:

            - Total daily calorie target: %s.
            - Diet type: %s.
            - Cuisine preference: %s.
            - Additional considerations: %s.
            - Meal frequency: %s.
            - Meal breakdown: Design the daily meals to adhere to the specified meal frequency (e.g., if '3 meals', include only Breakfast, Lunch, Dinner; if '5 meals', include Breakfast, Mid-morning Snack, Lunch, Evening Snack, Dinner). Ensure all meals are distinct.
            - Ensure the plan is balanced, includes variety, and meets the calorie and nutritional requirements.
            """,
                request.getCalorieTarget(),
                request.getDietaryPreference(),
                "Indian",
                request.getConsideration(),
                request.getMealFrequency()
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBody = new HashMap<>();
        Map<String, Object> textPart = new HashMap<>();
        textPart.put("text", prompt);
        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(textPart));
        requestBody.put("contents", List.of(content));

        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("temperature", 0.2); // Lower temperature for more structured output
        generationConfig.put("maxOutputTokens", 2000);
        requestBody.put("generationConfig", generationConfig);

        List<Map<String, Object>> safetySettings = List.of(
                Map.of("category", "HARM_CATEGORY_HARASSMENT", "threshold", "BLOCK_NONE"),
                Map.of("category", "HARM_CATEGORY_HATE_SPEECH", "threshold", "BLOCK_NONE"),
                Map.of("category", "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold", "BLOCK_NONE"),
                Map.of("category", "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold", "BLOCK_NONE")
        );
        requestBody.put("safetySettings", safetySettings);

        HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<>(requestBody, headers);
        String geminiApiUrl = GEMINI_API_BASE_URL + GEMINI_MODEL_NAME + ":generateContent?key=" + apiKey;

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    geminiApiUrl,
                    httpEntity,
                    Map.class
            );

            Map<String, Object> responseBody = response.getBody();
            if (responseBody == null) {
                return ResponseEntity.internalServerError().body(createErrorResponse("Empty response from Gemini API."));
            }

            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");

            if (candidates != null && !candidates.isEmpty()) {
                Map<String, Object> firstCandidate = candidates.get(0);
                if (firstCandidate != null && firstCandidate.containsKey("content")) {
                    Map<String, Object> contentMap = (Map<String, Object>) firstCandidate.get("content");
                    if (contentMap != null && contentMap.containsKey("parts")) {
                        List<Map<String, Object>> parts = (List<Map<String, Object>>) contentMap.get("parts");
                        if (parts != null && !parts.isEmpty() && parts.get(0).containsKey("text")) {
                            String aiGeneratedRawText = parts.get(0).get("text").toString();

                            String aiGeneratedJsonString = cleanAiResponseForJson(aiGeneratedRawText);

                            try {
                                Map<String, Object> parsedDietPlan = objectMapper.readValue(aiGeneratedJsonString, new TypeReference<Map<String, Object>>() {});
                                System.out.println("role: "+request.getRole());
                                if (request.getRole().equals("admin")) {
                                    Admin admin  = adminProfileRepository.findByEmail(request.getEmail());
                                    dietPlan.setAdmin(admin);
                                    System.out.println("Admin "+ admin);
                                } else {
                                      User user = userRepository.findByEmail(request.getEmail());
                                      dietPlan.setUser(user);
                                    System.out.println("User "+user);
                                }

                                String dietPlanJson = objectMapper.writeValueAsString(parsedDietPlan);
                                dietPlan.setDietPlan(dietPlanJson);

                                return ResponseEntity.ok(parsedDietPlan);

                            } catch (Exception jsonParseError) {
                                jsonParseError.printStackTrace();
                                String errorMessage = "AI did not return valid JSON. Raw AI response (first 200 chars): " + aiGeneratedRawText.substring(0, Math.min(aiGeneratedRawText.length(), 200)) + "...";
                                return ResponseEntity.internalServerError().body(createErrorResponse(errorMessage));
                            }
                        }
                    }
                }
            }

            if (responseBody.containsKey("promptFeedback")) {
                Map<String, Object> promptFeedback = (Map<String, Object>) responseBody.get("promptFeedback");
                if (promptFeedback != null && promptFeedback.containsKey("blockReason")) {
                    String blockReason = promptFeedback.get("blockReason").toString();
                    return ResponseEntity.ok(createErrorResponse("Gemini API blocked the response: " + blockReason + ". Consider adjusting prompt or safety settings."));
                }
            }

            return ResponseEntity.internalServerError().body(createErrorResponse("Could not parse Gemini API response or no content generated."));

        } catch (HttpClientErrorException e) {
            e.printStackTrace();
            return ResponseEntity.status(e.getStatusCode()).body(createErrorResponse("Error from Gemini API (" + e.getStatusCode() + "): " + e.getResponseBodyAsString()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(createErrorResponse("An unexpected error occurred: " + e.getMessage()));
        }
    }

    private String cleanAiResponseForJson(String rawText) {
        if (rawText == null || rawText.trim().isEmpty()) {
            return rawText;
        }
        String cleanedText = rawText.trim();
        if (cleanedText.startsWith("```")) {
            int firstNewline = cleanedText.indexOf('\n');
            if (firstNewline != -1) {
                cleanedText = cleanedText.substring(firstNewline + 1); // Skip the opening fence line
            }
        }
        if (cleanedText.endsWith("```")) {
            int lastNewline = cleanedText.lastIndexOf('\n');
            if (lastNewline != -1 && cleanedText.substring(lastNewline).trim().equals("```")) {
                cleanedText = cleanedText.substring(0, lastNewline); // Remove the closing fence line
            }
        }

        cleanedText = cleanedText.replaceAll("^json\\s*", "");

        // Trim again after removing fences
        return cleanedText.trim();
    }


    private Map<String, String> createErrorResponse(String errorMessage) {
        Map<String, String> response = new HashMap<>();
        response.put("error", errorMessage);
        return response;
    }
}