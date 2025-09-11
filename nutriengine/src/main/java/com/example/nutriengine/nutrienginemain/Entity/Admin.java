package com.example.nutriengine.nutrienginemain.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "admin")
public class Admin {

//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;

    @Column(unique = true, nullable = false)
    private String name;
    private String username;
    @Id
    private String email;

    @Column(nullable = false)
    private String password;

    @ElementCollection(fetch =  FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")

    private Set<String> roles;
}
