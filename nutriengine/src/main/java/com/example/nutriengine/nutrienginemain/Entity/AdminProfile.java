package com.example.nutriengine.nutrienginemain.Entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "admin_profile")
public class AdminProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String fullName;
    private String email;
    private String profilePictureUrl;
    private String gender;
    private String city;
    private String state;
    private String yearsOfExperience;
    private String highestQualification;
    private Long phone;

}
