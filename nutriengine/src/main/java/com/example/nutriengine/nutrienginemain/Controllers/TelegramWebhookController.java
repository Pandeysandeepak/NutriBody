package com.example.nutriengine.nutrienginemain.Controllers;

import com.example.nutriengine.nutrienginemain.Entity.TelegramUpdate;
import com.example.nutriengine.nutrienginemain.Services.OpenAiService;
import com.example.nutriengine.nutrienginemain.Services.TelegramService;
//import com.theokanning.openai.service.OpenAiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class TelegramWebhookController {
    @Autowired
    private OpenAiService openAiService;

    @Autowired
    private TelegramService telegramService;

    @PostMapping("/telegram-webhook")
    public void onUpdateReceived(@RequestBody TelegramUpdate update) {
        String userMessage = update.getMessage().getText();
        Long chatId = update.getMessage().getChat().getId();

        String reply = openAiService.askGemini(userMessage);
        telegramService.sendMessage(chatId, reply);
    }
}
