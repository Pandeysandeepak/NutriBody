package com.example.nutriengine.nutrienginemain.Services;


import com.example.nutriengine.nutrienginemain.Entity.DietPlanRequest;
import com.example.nutriengine.nutrienginemain.Respositories.DietPlanRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DietPlanRequestService {
    @Autowired
    DietPlanRequestRepository dietPlanRequestRepository ;

    public DietPlanRequest savePlanData(DietPlanRequest dietPlanRequest){
        return dietPlanRequestRepository.save(dietPlanRequest);
    }


}
