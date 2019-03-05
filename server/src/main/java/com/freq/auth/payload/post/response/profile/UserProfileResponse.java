package com.freq.auth.payload.post.response.profile;

import com.freq.auth.payload.UserSummary;
import com.freq.auth.payload.post.response.post.ProfilePostResponse;

import java.util.List;

public class UserProfileResponse {
    private UserSummary userSummary;
    private String bio;
    private String url;
    private Long postCount;
    private List<ProfilePostResponse> posts;
    private List<ProfilePostResponse> savedPosts;
    private Long followersCount;
    private Long followingCount;
    private boolean isFollowed;
    private boolean isPrivate;
    private boolean requestSent;

    public UserProfileResponse(){}

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public boolean isRequestSent() {
        return requestSent;
    }

    public void setRequestSent(boolean requestSent) {
        this.requestSent = requestSent;
    }

    public boolean isFollowed() {
        return isFollowed;
    }

    public void setFollowed(boolean followed) {
        isFollowed = followed;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }

    public List<ProfilePostResponse> getSavedPosts() {
        return savedPosts;
    }

    public void setSavedPosts(List<ProfilePostResponse> savedPosts) {
        this.savedPosts = savedPosts;
    }

    public UserSummary getUserSummary() {
        return userSummary;
    }

    public void setUserSummary(UserSummary userSummary) {
        this.userSummary = userSummary;
    }

    public Long getPostCount() {
        return postCount;
    }

    public void setPostCount(Long postCount) {
        this.postCount = postCount;
    }

    public List<ProfilePostResponse> getPosts() {
        return posts;
    }

    public void setPosts(List<ProfilePostResponse> posts) {
        this.posts = posts;
    }

    public Long getFollowersCount() {
        return followersCount;
    }

    public void setFollowersCount(Long followersCount) {
        this.followersCount = followersCount;
    }

    public Long getFollowingCount() {
        return followingCount;
    }

    public void setFollowingCount(Long followingCount) {
        this.followingCount = followingCount;
    }
}
