package com.freq.auth.controller;

import com.freq.auth.exception.ResourceNotFoundException;
import com.freq.auth.model.user.User;
import com.freq.auth.payload.*;
import com.freq.auth.payload.post.response.*;
import com.freq.auth.payload.post.response.notification.NotificationsPayload;
import com.freq.auth.payload.post.response.profile.EditProfileResponse;
import com.freq.auth.payload.post.response.profile.PrivateResponse;
import com.freq.auth.payload.post.response.profile.ProfilePictureUpdateResponse;
import com.freq.auth.payload.post.response.profile.UserProfileResponse;
import com.freq.auth.repository.UserRepository;
import com.freq.auth.repository.post.PostRepository;
import com.freq.auth.security.CurrentUser;
import com.freq.auth.security.UserPrincipal;
import com.freq.auth.service.FileStorageService;
import com.freq.auth.service.UserService;
import com.freq.auth.util.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;

@RestController
@RequestMapping("api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository pollRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private FileStorageService fileStorageService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName(), currentUser.getImagePath());
        return userSummary;
    }

    @GetMapping("/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        long postsCount = pollRepository.countByCreatedBy(user.getId());

        UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getName(), user.getCreatedAt(), postsCount);

        return userProfile;
    }

    @GetMapping("/search/{usernameOrName}")
    public PagedResponse<UserSummary> getUsersByUsernameOrName( @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                        @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
                                                        @PathVariable(value="usernameOrName") String usernameOrName) {
        return userService.getUsersByUsernameOrName(page, size, usernameOrName);
    }

    @GetMapping("/profile/{username}")
    public UserProfileResponse getUserProfileByUsername(@PathVariable(value = "username") String username,
                                                        @CurrentUser UserPrincipal currentUser){
        return userService.getUserProfileByUsername(username, currentUser);
    }

    @GetMapping("/profile/edit")
    public EditProfileResponse getProfileDetailsToEdit(@CurrentUser UserPrincipal currentUser){
        return userService.getProfileDetailsToEdit(currentUser);
    }

    @PutMapping("/profile/edit")
    public ResponseEntity<?> updateUser(@CurrentUser UserPrincipal currentUser,
                                        @Valid @RequestBody UpdateUserRequest updateUserRequest){

        userService.updateUser(currentUser, updateUserRequest);

        return ResponseEntity.ok().body(new ApiResponse(true, "User updated successfully."));
    }

    @PostMapping("/profile/photo")
    public ResponseEntity<?> updateUserPhoto(@CurrentUser UserPrincipal currentUser,
                                        @RequestParam("image") MultipartFile image){

        String fileName = fileStorageService.storeFile(image);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("api/posts/images/")
                .path(fileName)
                .toUriString();

        userService.updateUserPicture(currentUser, fileDownloadUri);

        return ResponseEntity.ok().body(new ProfilePictureUpdateResponse(fileDownloadUri));
    }

    @DeleteMapping("/profile/photo")
    public ResponseEntity<?> deleteUserPhoto(@CurrentUser UserPrincipal currentUser){
        userService.updateUserPicture(currentUser, null);
        return ResponseEntity.ok().body(new ApiResponse(true, "User profile picture deleted successfully."));
    }

    @PutMapping("/me/private")
    public PrivateResponse setIsPrivate(@CurrentUser UserPrincipal currentUser){
        return userService.setIsPrivate(currentUser);
    }

    @GetMapping("/notifications")
    public NotificationsPayload getUserNotifications(@CurrentUser UserPrincipal currentUser){
        return userService.getUserNotifications(currentUser);
    }
}
