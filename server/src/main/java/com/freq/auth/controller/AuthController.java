package com.freq.auth.controller;

import com.freq.auth.payload.user.ChangePasswordRequest;
import com.freq.auth.payload.user.LoginRequest;
import com.freq.auth.payload.user.SignUpRequest;
import com.freq.auth.service.AuthService;
import com.freq.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return authService.authenticateUser(loginRequest);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @ModelAttribute SignUpRequest signUpRequest,
                                          @RequestParam("image") MultipartFile image) {
        return authService.registerUser(signUpRequest, image);
    }

    @PostMapping("/password/change")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        return userService.changeUserPassword(changePasswordRequest);
    }
}
