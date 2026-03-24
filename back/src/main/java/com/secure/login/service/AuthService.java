package com.secure.login.service;

import com.secure.login.dto.Dtos;
import com.secure.login.model.User;
import com.secure.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Dtos.MessageResponse register(Dtos.RegisterRequest request) {
        if (userRepository.existsByEmail(request.email)) {
            throw new RuntimeException("Email is already in use");
        }

        User user = new User(
                request.name,
                request.email,
                passwordEncoder.encode(request.password)
        );

        userRepository.save(user);

        return new Dtos.MessageResponse("User registered successfully");
    }

    public Dtos.UserInfo getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new Dtos.UserInfo(
                user.getId(),
                user.getEmail(),
                user.getName()
        );
    }
}