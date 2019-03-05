package com.freq.auth.controller;

import com.freq.auth.exception.AppException;
import com.freq.auth.exception.InvalidOldPasswordException;
import com.freq.auth.model.user.Role;
import com.freq.auth.model.user.RoleName;
import com.freq.auth.model.user.User;
import com.freq.auth.payload.*;
import com.freq.auth.repository.RoleRepository;
import com.freq.auth.repository.UserRepository;
import com.freq.auth.security.JwtTokenProvider;
import com.freq.auth.service.FileStorageService;
import com.freq.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @ModelAttribute SignUpRequest signUpRequest,
                                          @RequestParam("image") MultipartFile image){
        if(userRepository.existsByUsername(signUpRequest.getUsername()))
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"), HttpStatus.BAD_REQUEST);

        if(userRepository.existsByEmail(signUpRequest.getEmail()))
            return new ResponseEntity(new ApiResponse(false, "Email Adress is already in use!"), HttpStatus.BAD_REQUEST);

        String fileName = fileStorageService.storeFile(image);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("api/posts/images/")
                .path(fileName)
                .toUriString();

        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(), signUpRequest.getPassword(), fileDownloadUri);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(() -> new AppException("User Role not set."));
        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("api/users/{username}").buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully."));
    }

    @PostMapping("/password/change")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest changePasswordRequest){
        Optional<User> user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());

        if(!userService.checkIfValidOldPassword(user.get(), changePasswordRequest.getOldPassword()))
            throw new InvalidOldPasswordException();

        userService.changeUserPassword(user.get(), changePasswordRequest.getNewPassword());

        return ResponseEntity.ok(new ApiResponse(true, "Password changed successfully."));
    }
}
