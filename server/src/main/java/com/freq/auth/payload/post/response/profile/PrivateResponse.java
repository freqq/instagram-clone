package com.freq.auth.payload.post.response.profile;

public class PrivateResponse {
    private boolean isPrivate;

    public PrivateResponse(boolean isPrivate) {
        this.isPrivate = isPrivate;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }
}
