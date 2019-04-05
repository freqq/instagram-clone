package com.freq.auth.service;

import com.freq.auth.model.user.User;
import com.freq.auth.payload.post.response.*;
import com.freq.auth.payload.post.response.notification.NotificationsPayload;
import com.freq.auth.payload.post.response.profile.EditProfileResponse;
import com.freq.auth.payload.post.response.profile.PrivateResponse;
import com.freq.auth.payload.post.response.profile.UserProfileResponse;
import com.freq.auth.payload.user.*;
import com.freq.auth.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface UserService {
    PagedResponse<UserSummary> getUsersByUsernameOrName(int page, int size, String usernameOrName);

    UserProfileResponse getUserProfileByUsername(String username, UserPrincipal currentUser);

    EditProfileResponse getProfileDetailsToEdit(UserPrincipal currentUser);

    void updateUser(UserPrincipal currentUser, UpdateUserRequest updateUserRequest);

    UserProfile getUserProfile(String username);

    ResponseEntity<?> updateUserPicture(UserPrincipal currentUser, MultipartFile image);

    PrivateResponse setIsPrivate(UserPrincipal currentUser);

    ResponseEntity<?> changeUserPassword(ChangePasswordRequest changePasswordRequest);

    boolean checkIfValidOldPassword(User user, String oldPassword);

    NotificationsPayload getUserNotifications(UserPrincipal currentUser);

    void validatePageNumberAndSize(int page, int size);

    UserIdentityAvailability checkUsernameAvailability(String username);

    UserIdentityAvailability checkEmailAvailability(String email);
}
