package com.freq.auth.payload.post.response.post;

import com.freq.auth.payload.post.response.like.LikedReponse;

public class PhotoModalResponse {
    private PostResponse postResponse;
    private LikedReponse likedReponse;
    private SavedPostResponse savedPostResponse;
    private int likeCount;

    public LikedReponse getLikedReponse() {
        return likedReponse;
    }

    public void setLikedReponse(LikedReponse likedReponse) {
        this.likedReponse = likedReponse;
    }

    public SavedPostResponse getSavedPostResponse() {
        return savedPostResponse;
    }

    public void setSavedPostResponse(SavedPostResponse savedPostResponse) {
        this.savedPostResponse = savedPostResponse;
    }

    public PostResponse getPostResponse() {
        return postResponse;
    }

    public void setPostResponse(PostResponse postResponse) {
        this.postResponse = postResponse;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }
}
