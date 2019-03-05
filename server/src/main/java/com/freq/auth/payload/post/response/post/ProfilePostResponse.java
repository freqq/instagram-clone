package com.freq.auth.payload.post.response.post;

public class ProfilePostResponse {
    private Long id;
    private String imagePath;
    private Long likeCount;
    private Long commentCount;

    public ProfilePostResponse(){}

    public ProfilePostResponse(String imagePath, Long likeCount, Long commentCount) {
        this.imagePath = imagePath;
        this.likeCount = likeCount;
        this.commentCount = commentCount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Long getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Long likeCount) {
        this.likeCount = likeCount;
    }

    public Long getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(Long commentCount) {
        this.commentCount = commentCount;
    }
}
