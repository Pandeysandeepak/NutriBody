package com.example.nutriengine.nutrienginemain.Entity;

public class TelegramUpdate {
    private Message message;

    public Message getMessage() { return message; }

    public void setMessage(Message message) { this.message = message; }

    public static class Message {
        private Long message_id;
        private Chat chat;
        private String text;

        public Long getMessage_id() { return message_id; }
        public void setMessage_id(Long message_id) { this.message_id = message_id; }

        public Chat getChat() { return chat; }
        public void setChat(Chat chat) { this.chat = chat; }

        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
    }

    public static class Chat {
        private Long id;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
    }
}
