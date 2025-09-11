package com.example.nutriengine.nutrienginemain.Services;

import com.example.nutriengine.nutrienginemain.Entity.DietPlan;
import com.example.nutriengine.nutrienginemain.Respositories.DietPlanRepositories;
import org.hibernate.annotations.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DietPlanService {
    @Autowired
    DietPlanRepositories dietPlanRepositories;

    public DietPlan saveDietPlan(DietPlan dietPlan){
        return dietPlanRepositories.save(dietPlan);
    }


}
