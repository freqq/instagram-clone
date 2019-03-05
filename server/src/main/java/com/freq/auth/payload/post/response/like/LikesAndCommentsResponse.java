package com.freq.auth.payload.post.response.like;

public class LikesAndCommentsResponse {
    private int likesCount;
    private int commentsCount;

    public LikesAndCommentsResponse() {
    }

    public LikesAndCommentsResponse(int likesCount, int commentsCount) {
        this.likesCount = likesCount;
        this.commentsCount = commentsCount;
    }

    public int getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(int likesCount) {
        this.likesCount = likesCount;
    }

    public int getCommentsCount() {
        return commentsCount;
    }

    public void setCommentsCount(int commentsCount) {
        this.commentsCount = commentsCount;
    }
}
