package com.freq.auth.service;

import com.freq.auth.payload.user.LoginRequest;
import com.freq.auth.payload.user.SignUpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface AuthService {
    ResponseEntity<?> registerUser(SignUpRequest signUpRequest, MultipartFile image);

    ResponseEntity<?> authenticateUser(LoginRequest loginRequest);
}
