package com.example.nutriengine.nutrienginemain.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.*;

@Entity
@Data
@Table(name = "diet_plan_requests")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DietPlanRequest {

    @Id
    private String userId;

    private String name;
    private String email;
    private String gender;
    private int age;
    private int height;
    private double weight;
    private String activityLevel;
    private String goal;
    private String dietaryPreference;
    private String mealFrequency;
    private String role;
    private String consideration;

    // Remove from DB if it's computed dynamically
    @Transient
    private String calorieTarget;

    public double generateTargetCalorie() {
        double bmr = calculateBMR();
        double tdee = bmr * getActivityMultiplier();
        return adjustForGoal(tdee);
    }

    private double calculateBMR() {
        return (weight * 10) + (height * 6.25) - (age * 5)
                + ("male".equalsIgnoreCase(gender) ? 5 : -161);
    }

    private double getActivityMultiplier() {
        return switch (activityLevel.toLowerCase()) {
            case "sedentary" -> 1.2;
            case "light"     -> 1.375;
            case "moderate"  -> 1.55;
            case "very"      -> 1.725;
            default          -> 1.9; // extra active or unknown
        };
    }

    private double adjustForGoal(double tdee) {
        return switch (goal.toLowerCase()) {
            case "gain" -> tdee + 250;
            case "lose" -> tdee - 500;
            default     -> tdee;
        };
    }

    /**
     * Custom setter to auto-generate calorie target
     */
    public void setCalorieTarget(String ignored) {
        this.calorieTarget = String.format("%.0f", generateTargetCalorie());
    }
}
