package com.example.nutriengine.nutrienginemain.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
public class User {
    private String name;
    private String username;
    @Id
    private String email;
    private String password;
}
