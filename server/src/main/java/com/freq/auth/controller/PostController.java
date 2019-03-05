package com.freq.auth.controller;

import com.freq.auth.model.post.Comment;
import com.freq.auth.model.post.Post;
import com.freq.auth.model.user.User;
import com.freq.auth.payload.ApiResponse;
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
import com.freq.auth.repository.UserRepository;
import com.freq.auth.security.CurrentUser;
import com.freq.auth.security.UserPrincipal;
import com.freq.auth.service.CommentService;
import com.freq.auth.service.FileStorageService;
import com.freq.auth.service.PostService;
import com.freq.auth.util.AppConstants;
import com.freq.auth.util.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

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

        String fileName = fileStorageService.storeFile(image);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("api/posts/images/")
                .path(fileName)
                .toUriString();

        Post post = postService.createPost(postRequest, fileDownloadUri);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{postId}")
                .buildAndExpand(post.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Post created successfully."));
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
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
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
        Comment comment = commentService.commentPost(postId, commentRequest, currentUser);

        User user = userRepository.getOne(currentUser.getId());

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{commentId}")
                .buildAndExpand(comment.getId()).toUri();

        return ModelMapper.mapCommentToCommentResponse(comment, user);
    }

    @PostMapping("{postId}/like")
    @PreAuthorize("hasRole('USER')")
    public LikedReponse likePost(@PathVariable Long postId, @CurrentUser UserPrincipal currentUser){
        return postService.addPostLike(postId, currentUser);
    }

    @GetMapping("/{postId}/like")
    @PreAuthorize("hasRole('USER')")
    public PagedResponse<LikeResponse> getLikesByPostId(@PathVariable Long postId,
                                                        @CurrentUser UserPrincipal currentUser,
                                                        @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                        @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size){
        return postService.getLikesByPostId(currentUser, page, size, postId);
    }

    @GetMapping("{postId}/like/exists")
    @PreAuthorize("hasRole('USER')")
    public LikedReponse isPostLikedByCurrentUser(@PathVariable Long postId,
                                                 @CurrentUser UserPrincipal currentUser){
        return postService.checkIfPostLiked(postId, currentUser);
    }

    @GetMapping("{postId}/like/count")
    public LikeCountResponse getLikesCountByPostId(@PathVariable Long postId){
        return postService.getLikesCountByPostId(postId);
    }

    @PostMapping("{postId}/save")
    @PreAuthorize("hasRole('USER')")
    public SavedPostResponse savePost(@PathVariable Long postId, @CurrentUser UserPrincipal currentUser){
        return postService.savePostForUser(postId, currentUser);
    }

    @GetMapping("{postId}/save/exists")
    @PreAuthorize("hasRole('USER')")
    public SavedPostResponse isPostSavedByCurrentUser(@PathVariable Long postId,
                                                 @CurrentUser UserPrincipal currentUser){
        return postService.checkIfPostSaved(postId, currentUser);
    }

    @GetMapping("{postId}/modal")
    @PreAuthorize("hasRole('USER')")
    public PhotoModalResponse getPhotoModalInfo(@PathVariable Long postId,
                                                @CurrentUser UserPrincipal currentUser){
        return postService.getPhotoModalInfo(postId, currentUser);
    }
}
