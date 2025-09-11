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
    @Column(name = "id", insertable = false, updatable = false)
    private Long id;
    private String username;
    private String fullName;
    @Id
    private String email;
    private String profilePictureUrl;
    private String gender;
    private String city;
    private String state;
    private String yearsOfExperience;
    private String highestQualification;
    private Long phone;

}
