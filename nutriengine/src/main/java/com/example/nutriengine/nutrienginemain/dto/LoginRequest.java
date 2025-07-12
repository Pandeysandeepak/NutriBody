package com.example.nutriengine.nutrienginemain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class LoginRequest {

    private String email;
    private String password;
    private Set<String> role;
}
