package com.freq.auth.service;

import com.freq.auth.exception.BadRequestException;
import com.freq.auth.model.ObserveNotification;
import com.freq.auth.model.PostNotification;
import com.freq.auth.model.PostNotificationType;
import com.freq.auth.model.post.Post;
import com.freq.auth.model.post.SavedPost;
import com.freq.auth.model.user.Follow;
import com.freq.auth.model.user.FollowRequest;
import com.freq.auth.model.user.User;
import com.freq.auth.payload.UpdateUserRequest;
import com.freq.auth.payload.UserSummary;
import com.freq.auth.payload.post.response.*;
import com.freq.auth.payload.post.response.like.LikesAndCommentsResponse;
import com.freq.auth.payload.post.response.notification.FollowRequestPayload;
import com.freq.auth.payload.post.response.notification.NotificationsPayload;
import com.freq.auth.payload.post.response.notification.ObserveNotificationPayload;
import com.freq.auth.payload.post.response.notification.PostNotificationPayload;
import com.freq.auth.payload.post.response.profile.EditProfileResponse;
import com.freq.auth.payload.post.response.profile.PrivateResponse;
import com.freq.auth.payload.post.response.profile.UserProfileResponse;
import com.freq.auth.repository.UserRepository;
import com.freq.auth.repository.follow.FollowRepository;
import com.freq.auth.repository.follow.FollowRequestRepository;
import com.freq.auth.repository.notification.ObserveNotificationRepository;
import com.freq.auth.repository.notification.PostNotificationRepository;
import com.freq.auth.repository.post.CommentRepository;
import com.freq.auth.repository.post.LikeRepository;
import com.freq.auth.repository.post.PostRepository;
import com.freq.auth.repository.post.SavedPostRepository;
import com.freq.auth.security.UserPrincipal;
import com.freq.auth.util.AppConstants;
import com.freq.auth.util.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SavedPostRepository savedPostRepository;

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private ObserveNotificationRepository observeNotificationRepository;

    @Autowired
    private PostNotificationRepository postNotificationRepository;

    @Autowired
    private FollowRequestRepository followRequestRepository;

    private String defaultImagePath = "http://localhost:5000/api/posts/images/default_avatar.jpg";

    public PagedResponse<UserSummary> getUsersByUsernameOrName(int page, int size, String usernameOrName){
        validatePageNumberAndSize(page, size);

        // Retrieve Users
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<User> users = userRepository.findByUsernameContainingOrNameContaining(usernameOrName, usernameOrName, pageable);

        if(users.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), users.getNumber(),
                    users.getSize(), users.getTotalElements(), users.getTotalPages(), users.isLast());
        }

        List<UserSummary> userSummaries = users.map(user -> {
            return ModelMapper.mapUsersToUserSummaries(user);
        }).getContent();

        return new PagedResponse<>(userSummaries, users.getNumber(),
                users.getSize(), users.getTotalElements(), users.getTotalPages(), users.isLast());
    }

    public UserProfileResponse getUserProfileByUsername(String username, UserPrincipal currentUser){
        //userSummary
        Optional<User> user = userRepository.findByUsername(username);

        //userPhotos
        List<Post> posts = postRepository.findByCreatedBy(user.get().getId());
        List<LikesAndCommentsResponse> likesAndCommentsResponses = new ArrayList<>();
        for(Post post : posts){
            LikesAndCommentsResponse likesAndCommentsResponse = new LikesAndCommentsResponse();
            likesAndCommentsResponse.setCommentsCount((int) commentRepository.countByPostId(post.getId()));
            likesAndCommentsResponse.setLikesCount((int) likeRepository.countByPostId(post.getId()));
            likesAndCommentsResponses.add(likesAndCommentsResponse);
        }

        //savedPhotos
        List<SavedPost> savedPostsList = savedPostRepository.findByCreatedBy(user.get().getId());
        List<Post> savedPosts = new ArrayList<>();
        for(SavedPost savedPost : savedPostsList){
            savedPosts.add(postRepository.findById(savedPost.getPost().getId()).get());
        }
        List<LikesAndCommentsResponse> likesAndCommentsResponsesForSavedPosts = new ArrayList<>();
        for(Post post : savedPosts){
            LikesAndCommentsResponse likesAndCommentsResponse = new LikesAndCommentsResponse();
            likesAndCommentsResponse.setCommentsCount((int) commentRepository.countByPostId(post.getId()));
            likesAndCommentsResponse.setLikesCount((int) likeRepository.countByPostId(post.getId()));
            likesAndCommentsResponsesForSavedPosts.add(likesAndCommentsResponse);
        }

        //postCount
        long postCount = postRepository.countByCreatedBy(user.get().getId());

        //followersCount
        int followersCount = followRepository.countByFollowingId(user.get().getId());

        //followingCount
        int followingCount = followRepository.countByFollowerId(user.get().getId());

        Optional<Follow> follow = followRepository.findFollowByFollowerIdAndFollowingId(currentUser.getId(), user.get().getId());

        boolean isFollowed = follow.isPresent();

        boolean requestSent = followRequestRepository.findByFollowerIdAndFollowingId(currentUser.getId(), user.get().getId()).isPresent();

        return ModelMapper.mapDataToUserProfileResponse(user.get(), posts, likesAndCommentsResponses, savedPosts, likesAndCommentsResponsesForSavedPosts, postCount, followersCount, followingCount, isFollowed, requestSent);
    }

    public EditProfileResponse getProfileDetailsToEdit(UserPrincipal currentUser){
        User user = userRepository.findByUsername(currentUser.getUsername()).get();
        return ModelMapper.mapUserToEditProfileResponse(user);
    }

    public void updateUser(UserPrincipal currentUser, UpdateUserRequest updateUserRequest){
        User userToUpdate = userRepository.getOne(currentUser.getId());

        userToUpdate.setName(updateUserRequest.getName());
        userToUpdate.setUsername(updateUserRequest.getUsername());
        userToUpdate.setUrl(updateUserRequest.getUrl());
        userToUpdate.setBio(updateUserRequest.getBio());
        userToUpdate.setEmail(updateUserRequest.getEmail());
        userToUpdate.setPhone(updateUserRequest.getPhone());
        userToUpdate.setSex(updateUserRequest.getSex());

        userRepository.save(userToUpdate);
    }

    public void updateUserPicture(UserPrincipal currentUser, String fileDownloadUri){
        User userToUpdate = userRepository.getOne(currentUser.getId());
        if(fileDownloadUri == null)
            userToUpdate.setImagePath(defaultImagePath);
        else
            userToUpdate.setImagePath(fileDownloadUri);

        userRepository.save(userToUpdate);
    }

    public PrivateResponse setIsPrivate(UserPrincipal currentUser){
        User userToUpdate = userRepository.getOne(currentUser.getId());

        userToUpdate.setPrivate(!userToUpdate.isPrivate());
        userRepository.save(userToUpdate);
        return new PrivateResponse(userToUpdate.isPrivate());
    }

    public void changeUserPassword(User user, String password){
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    public boolean checkIfValidOldPassword(User user, String oldPassword){
        return passwordEncoder.matches(oldPassword, user.getPassword());
    }

    public NotificationsPayload getUserNotifications(UserPrincipal currentUser){
        List<PostNotification> postNotifications = postNotificationRepository.findAllByNotificationReceiverId(currentUser.getId());
        List<ObserveNotification> observeNotifications = observeNotificationRepository.findAllByNotificationReceiverId(currentUser.getId());
        List<FollowRequest> followRequests = followRequestRepository.findAllByFollowingId(currentUser.getId());

        List<PostNotificationPayload> postNotificationPayloads = new ArrayList<>();
        for(PostNotification postNotification : postNotifications){
            User user = userRepository.getOne(postNotification.getNotificationCreator().getId());
            String imagePath = postNotification.getPost().getImagePath();
            postNotificationPayloads.add(ModelMapper.mapPostNotificationToPostNotificationResponse(postNotification, user, imagePath));
        }

        List<ObserveNotificationPayload> observeNotificationPayloads = new ArrayList<>();
        for(ObserveNotification observeNotification : observeNotifications){
            Optional<Follow> follow = followRepository.findFollowByFollowerIdAndFollowingId(currentUser.getId(), observeNotification.getNotificationCreator().getId());
            boolean isFollowed = follow.isPresent();
            User user = userRepository.getOne(observeNotification.getNotificationCreator().getId());

            observeNotificationPayloads.add(ModelMapper.mapObserveNotificationToObserveNotificationResponse(observeNotification, user, isFollowed));
        }

        List<FollowRequestPayload> followRequestPayloads = new ArrayList<>();
        for(FollowRequest followRequest : followRequests){
            followRequestPayloads.add(ModelMapper.mapFollowRequestToFollowRequestResponse(followRequest));
        }

        return new NotificationsPayload(postNotificationPayloads, observeNotificationPayloads, followRequestPayloads, followRequests.size());
    }

    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
}
