package com.freq.auth.payload.follow;

import com.freq.auth.payload.user.UserSummary;

import java.util.List;

public class FollowListResponse {
    private List<UserSummary> userSummaryList;

    public List<UserSummary> getUserSummaryList() {
        return userSummaryList;
    }

    public void setUserSummaryList(List<UserSummary> userSummaryList) {
        this.userSummaryList = userSummaryList;
    }
}
