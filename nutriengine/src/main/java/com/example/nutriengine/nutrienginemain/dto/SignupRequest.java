package com.example.nutriengine.nutrienginemain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class SignupRequest {
    private String name;
    private String username;
    private String email;
    private String password;
    private Set<String> roles;
}
