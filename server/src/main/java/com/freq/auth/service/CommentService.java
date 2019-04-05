package com.freq.auth.service;

import com.freq.auth.exception.BadRequestException;
import com.freq.auth.exception.ResourceNotFoundException;
import com.freq.auth.model.notification.PostNotification;
import com.freq.auth.model.notification.PostNotificationType;
import com.freq.auth.model.post.Comment;
import com.freq.auth.model.post.Post;
import com.freq.auth.model.user.User;
import com.freq.auth.payload.post.CommentRequest;
import com.freq.auth.payload.post.response.comment.CommentResponse;
import com.freq.auth.payload.post.response.PagedResponse;
import com.freq.auth.repository.UserRepository;
import com.freq.auth.repository.notification.PostNotificationRepository;
import com.freq.auth.repository.post.CommentRepository;
import com.freq.auth.repository.post.PostRepository;
import com.freq.auth.security.UserPrincipal;
import com.freq.auth.util.AppConstants;
import com.freq.auth.util.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostNotificationRepository postNotificationRepository;

    public Comment commentPost(Long postId, CommentRequest commentRequest, UserPrincipal currentUser) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Poll", "id", postId));

        User user = userRepository.getOne(currentUser.getId());

        Comment comment = new Comment();
        comment.setBody(commentRequest.getBody());
        comment.setPost(post);
        comment.setUser(user);

        PostNotification postNotification = new PostNotification();
        postNotification.setPost(post);
        postNotification.setNotificationType(PostNotificationType.POST_COMMENTED);
        postNotification.setNotificationCreator(user);
        postNotification.setNotificationReceiver(userRepository.getOne(post.getCreatedBy()));
        postNotificationRepository.save(postNotification);

        return commentRepository.save(comment);
    }

    public PagedResponse<CommentResponse> getCommentsByPostId(UserPrincipal currentUser, int page, int size, Long postId) {
        validatePageNumberAndSize(page, size);

        // Retrieve Polls
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Comment> comments = commentRepository.findCommentsByPostId(postId, pageable);

        if (comments.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), comments.getNumber(),
                    comments.getSize(), comments.getTotalElements(), comments.getTotalPages(), comments.isLast());
        }

        Map<Long, User> creatorMap = getCommentCreatorMap(comments.getContent());

        List<CommentResponse> commentResponses = comments.map(comment -> {
            return ModelMapper.mapCommentToCommentResponse(comment,
                    creatorMap.get(comment.getCreatedBy()));
        }).getContent();

        return new PagedResponse<>(commentResponses, comments.getNumber(),
                comments.getSize(), comments.getTotalElements(), comments.getTotalPages(), comments.isLast());
    }

    public CommentResponse getCommentByPostIdAndCommentId(UserPrincipal currentUser, Long postId, Long commentId) {
        Comment comment = commentRepository.findCommentByPostIdAndCommentId(postId, commentId).orElseThrow(
                () -> new ResourceNotFoundException("Comment", "id", commentId));

        // Retrieve comment creator details
        User creator = userRepository.findById(comment.getCreatedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", comment.getCreatedBy()));

        return ModelMapper.mapCommentToCommentResponse(comment, creator);
    }

    private void validatePageNumberAndSize(int page, int size) {
        if (page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if (size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }

    Map<Long, User> getCommentCreatorMap(List<Comment> comments) {
        // Get Poll Creator details of the given list of polls
        List<Long> creatorIds = comments.stream()
                .map(Comment::getCreatedBy)
                .distinct()
                .collect(Collectors.toList());

        List<User> creators = userRepository.findByIdIn(creatorIds);
        Map<Long, User> creatorMap = creators.stream()
                .collect(Collectors.toMap(User::getId, Function.identity()));

        return creatorMap;
    }
}
