package com.freq.auth.repository.follow;

import com.freq.auth.model.PostNotification;
import com.freq.auth.model.user.FollowRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRequestRepository extends JpaRepository<FollowRequest, Long> {
    List<FollowRequest> findAllByFollowingId(Long userId);

    @Query("SELECT f FROM FollowRequest f WHERE f.follower.id= :followerId AND f.following.id = :followingId")
    Optional<FollowRequest> findByFollowerIdAndFollowingId(@Param("followerId") Long followerId, @Param("followingId") Long followingId);
}
