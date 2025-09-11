package com.example.nutriengine.nutrienginemain.Services;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.json.JSONObject;

@Service
public class OpenAiService {
    @Value("${google.gemini.api-key}")
    private String API_KEY;
//    ${google.gemini.api-key}
    private static final String GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/";
    private static final String GEMINI_MODEL_NAME = "gemini-1.5-flash";
//    private final String API_KEY = "your-openai-api-key";
    private final String OPENAI_URL = GEMINI_API_BASE_URL + GEMINI_MODEL_NAME + ":generateContent?key=" + API_KEY;

    public String askGemini(String message) {
        OkHttpClient client = new OkHttpClient();

        JSONObject requestBody = new JSONObject();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", new org.json.JSONArray()
                .put(new JSONObject()
                        .put("role", "user")
                        .put("content", message)));

        Request request = new Request.Builder()
                .url(OPENAI_URL)
                .header("Authorization", "Bearer " + API_KEY)
                .post(RequestBody.create(
                        requestBody.toString(),
                        MediaType.parse("application/json")
                ))
                .build();

        try (Response response = client.newCall(request).execute()) {
            String body = response.body().string();
            JSONObject json = new JSONObject(body);
            return json.getJSONArray("choices")
                    .getJSONObject(0)
                    .getJSONObject("message")
                    .getString("content");
        } catch (Exception e) {
            e.printStackTrace();
            return "Sorry, AI service failed.";
        }
    }
}
