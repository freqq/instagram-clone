package com.freq.auth.payload.post.response.post;

public class SavedPostResponse {
    private boolean saved;

    public SavedPostResponse(boolean saved) {
        this.saved = saved;
    }

    public boolean isSaved() {
        return saved;
    }

    public void setSaved(boolean liked) {
        this.saved = liked;
    }
}
