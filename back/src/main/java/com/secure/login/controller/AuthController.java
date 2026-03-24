package com.secure.login.controller;

import com.secure.login.dto.Dtos;
import com.secure.login.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public Dtos.UserInfo login(@Valid @RequestBody Dtos.LoginRequest request, HttpSession session) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email, request.password));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return authService.getCurrentUser(request.email);
    }

    @PostMapping("/register")
    public Dtos.MessageResponse register(@Valid @RequestBody Dtos.RegisterRequest request) {
        return authService.register(request);
    }

    @GetMapping("/me")
    public Dtos.UserInfo getCurrentUser(Authentication authentication) {
        return authService.getCurrentUser(authentication.getName());
    }

    @PostMapping("/logout")
    public Dtos.MessageResponse logout(HttpSession session) {
        session.invalidate();
        SecurityContextHolder.clearContext();
        return new Dtos.MessageResponse("Logged out successfully");
    }
}