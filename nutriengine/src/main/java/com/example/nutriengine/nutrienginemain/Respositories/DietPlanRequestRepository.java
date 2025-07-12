package com.example.nutriengine.nutrienginemain.Respositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.nutriengine.nutrienginemain.Entity.DietPlanRequest;

import java.util.Optional;

public interface DietPlanRequestRepository extends JpaRepository<DietPlanRequest, Long> {

}
