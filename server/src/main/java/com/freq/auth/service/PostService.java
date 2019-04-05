package com.freq.auth.service;

import com.freq.auth.model.post.Like;
import com.freq.auth.model.post.Post;
import com.freq.auth.model.user.User;
import com.freq.auth.payload.post.CommentRequest;
import com.freq.auth.payload.post.PostRequest;
import com.freq.auth.payload.post.response.*;
import com.freq.auth.payload.post.response.comment.CommentResponse;
import com.freq.auth.payload.post.response.like.LikeCountResponse;
import com.freq.auth.payload.post.response.like.LikeResponse;
import com.freq.auth.payload.post.response.like.LikedReponse;
import com.freq.auth.payload.post.response.post.PhotoModalResponse;
import com.freq.auth.payload.post.response.post.PostResponse;
import com.freq.auth.payload.post.response.post.SavedPostResponse;
import com.freq.auth.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.core.io.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Service
public interface PostService {
     PagedResponse<PostResponse> getAllPosts(int page, int size, UserPrincipal currentUser);

     ResponseEntity<?> createPost(PostRequest postRequest, MultipartFile image);

     CommentResponse addComment(UserPrincipal currentUser, Long postId, CommentRequest commentRequest);

     PostResponse getPostById(Long postId, UserPrincipal currentUser);

     ResponseEntity<Resource> getPostImage(String fileName, HttpServletRequest request);

     PagedResponse<PostResponse> getPostByUserId(UserPrincipal currentUser, int page, int size, Long userId);

     PagedResponse<LikeResponse> getLikesByPostId(UserPrincipal currentUser, int page, int size, Long postId);

     LikedReponse addPostLike(Long postId, UserPrincipal currentUser);

     SavedPostResponse savePostForUser(Long postId, UserPrincipal currentUser);

     LikedReponse checkIfPostLiked(Long postId, UserPrincipal currentUser);

     SavedPostResponse checkIfPostSaved(Long postId, UserPrincipal currentUser);

     LikeCountResponse getLikesCountByPostId(Long postId);

     PhotoModalResponse getPhotoModalInfo(Long postId, UserPrincipal currentUser);

     Map<Long, User> getPostCreatorMap(List<Post> posts);

     Map<Long, User> getLikeCreatorMap(List<Like> likes);

     void validatePageNumberAndSize(int page, int size);
}
