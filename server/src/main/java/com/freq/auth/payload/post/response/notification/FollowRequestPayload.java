package com.freq.auth.payload.post.response.notification;

import com.freq.auth.payload.user.UserSummary;

import java.time.Instant;

public class FollowRequestPayload {
    private Long id;
    private UserSummary creator;
    private Instant creationDateTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserSummary getCreator() {
        return creator;
    }

    public void setCreator(UserSummary creator) {
        this.creator = creator;
    }

    public Instant getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(Instant creationDateTime) {
        this.creationDateTime = creationDateTime;
    }
}
