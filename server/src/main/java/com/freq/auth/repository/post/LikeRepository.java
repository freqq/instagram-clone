package com.freq.auth.repository.post;

import com.freq.auth.model.post.Like;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    @Query("SELECT l FROM Like l where l.post.id = :postId and l.user.id = :userId")
    Optional<Like> findLikeByPostIdByUserId(@Param("userId") Long userId, @Param("postId") Long postId);

    Page<Like> findByPostId(Long postId, Pageable pageable);

    @Query("SELECT COUNT(l.id) from Like l where l.post.id = :postId")
    long countByPostId(@Param("postId") Long postId);
}
