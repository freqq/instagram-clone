package com.freq.auth.payload.post.response.notification;

public class PostNotificationPayload extends NotificationPayload {
    private String imagePath;
    private String postNotificationType;

    public String getPostNotificationType() {
        return postNotificationType;
    }

    public void setPostNotificationType(String postNotificationType) {
        this.postNotificationType = postNotificationType;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
