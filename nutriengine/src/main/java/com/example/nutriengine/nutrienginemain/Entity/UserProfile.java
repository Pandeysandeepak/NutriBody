package com.example.nutriengine.nutrienginemain.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class UserProfile {
    @Id
    private String userId;
    private String userName;
    private String email;
    private String password;
    private String hashedPassword;
    private String gender;
    private int age;
    private int height;
    private double weight;
    private String activityLevel;
    private String goal;
    private String dietaryPreference;
    private String mealFrequency;
}
