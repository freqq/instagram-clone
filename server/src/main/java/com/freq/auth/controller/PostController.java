package com.freq.auth.controller;

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
import com.freq.auth.security.CurrentUser;
import com.freq.auth.security.UserPrincipal;
import com.freq.auth.service.CommentService;
import com.freq.auth.service.PostService;
import com.freq.auth.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @Autowired
    private CommentService commentService;

    @GetMapping()
    public PagedResponse<PostResponse> getPosts(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
                                                @CurrentUser UserPrincipal currentUser) {
        return postService.getAllPosts(page, size, currentUser);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createPost(@Valid @ModelAttribute PostRequest postRequest,
                                        @RequestParam("image") MultipartFile image) {

        return postService.createPost(postRequest, image);
    }

    @GetMapping("/{postId}")
    public PostResponse getPostById(@CurrentUser UserPrincipal currentUser,
                                    @PathVariable Long postId) {
        return postService.getPostById(postId, currentUser);
    }

    @GetMapping("/user/{userId}")
    public PagedResponse<PostResponse> getPostsByUserId(@CurrentUser UserPrincipal currentUser,
                                                        @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                        @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
                                                        @PathVariable Long userId) {
        return postService.getPostByUserId(currentUser, page, size, userId);
    }

    @GetMapping("/images/{fileName:.+}")
    public ResponseEntity<Resource> getPostImage(@PathVariable String fileName, HttpServletRequest request) {
        return postService.getPostImage(fileName, request);
    }

    @GetMapping("/{postId}/comments")
    public PagedResponse<CommentResponse> getCommentsByPostId(@CurrentUser UserPrincipal currentUser,
                                                              @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                              @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
                                                              @PathVariable Long postId) {
        return commentService.getCommentsByPostId(currentUser, page, size, postId);
    }

    @GetMapping("/{postId}/comments/{commentId}")
    public CommentResponse getCommentsByPostId(@CurrentUser UserPrincipal currentUser,
                                               @PathVariable Long postId,
                                               @PathVariable Long commentId) {
        return commentService.getCommentByPostIdAndCommentId(currentUser, postId, commentId);
    }

    @PostMapping("/{postId}/comments")
    @PreAuthorize("hasRole('USER')")
    public CommentResponse addComment(@CurrentUser UserPrincipal currentUser,
                                      @PathVariable Long postId,
                                      @Valid @RequestBody CommentRequest commentRequest) {
        return postService.addComment(currentUser, postId, commentRequest);

    }

    @PostMapping("{postId}/like")
    @PreAuthorize("hasRole('USER')")
    public LikedReponse likePost(@PathVariable Long postId, @CurrentUser UserPrincipal currentUser) {
        return postService.addPostLike(postId, currentUser);
    }

    @GetMapping("/{postId}/like")
    @PreAuthorize("hasRole('USER')")
    public PagedResponse<LikeResponse> getLikesByPostId(@PathVariable Long postId,
                                                        @CurrentUser UserPrincipal currentUser,
                                                        @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                        @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return postService.getLikesByPostId(currentUser, page, size, postId);
    }

    @GetMapping("{postId}/like/exists")
    @PreAuthorize("hasRole('USER')")
    public LikedReponse isPostLikedByCurrentUser(@PathVariable Long postId,
                                                 @CurrentUser UserPrincipal currentUser) {
        return postService.checkIfPostLiked(postId, currentUser);
    }

    @GetMapping("{postId}/like/count")
    public LikeCountResponse getLikesCountByPostId(@PathVariable Long postId) {
        return postService.getLikesCountByPostId(postId);
    }

    @PostMapping("{postId}/save")
    @PreAuthorize("hasRole('USER')")
    public SavedPostResponse savePost(@PathVariable Long postId, @CurrentUser UserPrincipal currentUser) {
        return postService.savePostForUser(postId, currentUser);
    }

    @GetMapping("{postId}/save/exists")
    @PreAuthorize("hasRole('USER')")
    public SavedPostResponse isPostSavedByCurrentUser(@PathVariable Long postId,
                                                      @CurrentUser UserPrincipal currentUser) {
        return postService.checkIfPostSaved(postId, currentUser);
    }

    @GetMapping("{postId}/modal")
    @PreAuthorize("hasRole('USER')")
    public PhotoModalResponse getPhotoModalInfo(@PathVariable Long postId,
                                                @CurrentUser UserPrincipal currentUser) {
        return postService.getPhotoModalInfo(postId, currentUser);
    }
}
