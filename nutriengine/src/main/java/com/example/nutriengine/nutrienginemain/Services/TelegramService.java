package com.example.nutriengine.nutrienginemain.Services;

import okhttp3.*;
import org.springframework.stereotype.Service;

@Service
public class TelegramService {

    private final String BOT_TOKEN = "your-telegram-bot-token";

    public void sendMessage(Long chatId, String text) {
        OkHttpClient client = new OkHttpClient();
        String url = "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage";

        RequestBody body = new FormBody.Builder()
                .add("chat_id", String.valueOf(chatId))
                .add("text", text)
                .build();

        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {
            System.out.println("Telegram reply sent: " + response.body().string());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

