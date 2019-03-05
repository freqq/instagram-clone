package com.freq.auth.repository.post;

import com.freq.auth.model.post.SavedPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavedPostRepository extends JpaRepository<SavedPost, Long> {
    @Query("SELECT p FROM SavedPost p where p.post.id = :postId and p.user.id = :userId")
    Optional<SavedPost> findSavedPostByPostIdByUserId(@Param("userId") Long userId, @Param("postId") Long postId);

    List<SavedPost> findByCreatedBy(Long userId);
}
