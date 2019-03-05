package com.freq.auth.payload.post.response.like;

public class LikedReponse {
    private boolean liked;

    public LikedReponse(boolean liked) {
        this.liked = liked;
    }

    public boolean isLiked() {
        return liked;
    }

    public void setLiked(boolean liked) {
        this.liked = liked;
    }
}
