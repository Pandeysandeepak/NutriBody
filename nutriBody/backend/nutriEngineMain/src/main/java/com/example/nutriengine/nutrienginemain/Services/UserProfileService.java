package com.example.nutriengine.nutrienginemain.Services;

import com.example.nutriengine.nutrienginemain.Entity.User;
import com.example.nutriengine.nutrienginemain.Respositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserProfileService {

    @Autowired
//    private UserProfileRepository UserRespository;
    private UserRepository UserRespository;



    public String generateHashPassword(){
        String hashPassword="";
       return hashPassword ;
    }

    public void generateUuid(){

    }

    // BMR(Basal Metabolic Rate)
    public void calculateBMR(){

    }

    // Total Daily Energy Expenditure
    public void calculateTDEE(){

    }

    public void calculateRequiredEnergy(){

    }
//
//    public List<User> getAllUsers(){
//       return UserRespository.findAll();
//    }

//    public UserProfile saveUserProfile(UserProfile user){
//        return UserRespository.save(user);
//    }

    public User saveUser(User user){
        return UserRespository.save(user);
    }

}
