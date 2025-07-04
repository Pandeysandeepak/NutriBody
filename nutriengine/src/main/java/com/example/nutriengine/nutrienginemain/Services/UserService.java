package com.example.nutriengine.nutrienginemain.Services;

import com.example.nutriengine.nutrienginemain.Entity.User;
import com.example.nutriengine.nutrienginemain.Respositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserService {

    @Autowired
    private UserRepository UserRespository;

    public User saveUser(User user){
        return UserRespository.save(user);
    }
}
