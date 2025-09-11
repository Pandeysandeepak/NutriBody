package com.example.nutriengine.nutrienginemain.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
public class User {
    @Column(name = "id", insertable = false, updatable = false)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;
    private String username;
    @Id
    private String email;

    @Column(nullable = false)
    private String password;

//    @ElementCollection(fetch =  FetchType.EAGER)
//    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
//    @Column(name = "role")

    private Set<String> roles;
}
