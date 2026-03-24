package com.secure.login.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class Dtos {

    public static class RegisterRequest {
        @NotBlank
        public String name;

        @NotBlank @Email
        public String email;

        @NotBlank @Size(min=6, max=20)
        public String password;
    }

    public static class LoginRequest {
        @NotBlank @Email
        public String email;

        @NotBlank
        public String password;
    }

    public static record MessageResponse(String message) {}

    public static record UserInfo(
            Long id,
            String email,
            String name
    ) {}
}