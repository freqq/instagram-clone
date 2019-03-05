package com.freq.auth.payload.post.response.notification;

import java.util.List;

public class NotificationsPayload {
    private List<PostNotificationPayload> postNotificationPayloads;
    private List<ObserveNotificationPayload> observeNotificationPayloads;
    private List<FollowRequestPayload> followRequestPayloads;
    private int followRequestCount;

    public NotificationsPayload(List<PostNotificationPayload> postNotificationPayloads, List<ObserveNotificationPayload> observeNotificationPayloads, List<FollowRequestPayload> followRequestPayloads, int followRequestCount) {
        this.postNotificationPayloads = postNotificationPayloads;
        this.observeNotificationPayloads = observeNotificationPayloads;
        this.followRequestPayloads = followRequestPayloads;
        this.followRequestCount = followRequestCount;
    }

    public int getFollowRequestCount() {
        return followRequestCount;
    }

    public void setFollowRequestCount(int followRequestCount) {
        this.followRequestCount = followRequestCount;
    }

    public List<FollowRequestPayload> getFollowRequestPayloads() {
        return followRequestPayloads;
    }

    public void setFollowRequestPayloads(List<FollowRequestPayload> followRequestPayloads) {
        this.followRequestPayloads = followRequestPayloads;
    }

    public List<PostNotificationPayload> getPostNotificationPayloads() {
        return postNotificationPayloads;
    }

    public void setPostNotificationPayloads(List<PostNotificationPayload> postNotificationPayloads) {
        this.postNotificationPayloads = postNotificationPayloads;
    }

    public List<ObserveNotificationPayload> getObserveNotificationPayloads() {
        return observeNotificationPayloads;
    }

    public void setObserveNotificationPayloads(List<ObserveNotificationPayload> observeNotificationPayloads) {
        this.observeNotificationPayloads = observeNotificationPayloads;
    }
}
