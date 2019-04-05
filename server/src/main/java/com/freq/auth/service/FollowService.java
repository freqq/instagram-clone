package com.freq.auth.service;

import com.freq.auth.payload.follow.FollowListResponse;
import com.freq.auth.payload.follow.FollowResponse;
import com.freq.auth.security.UserPrincipal;
import org.springframework.stereotype.Service;
@Service
public interface FollowService {
    FollowResponse followUser(Long userId, UserPrincipal currentUser);
    FollowResponse isFollowing(Long userId, UserPrincipal currentUser);
    FollowListResponse getUserFollowers(Long userId);
    FollowResponse isUserFollowedByCurrentUser(UserPrincipal currentUser, Long userId);
    FollowListResponse getUserFollowing(Long userId);
    FollowResponse acceptFollow(Long followRequestId);
    FollowResponse declineFollow(Long followRequestId);
}
