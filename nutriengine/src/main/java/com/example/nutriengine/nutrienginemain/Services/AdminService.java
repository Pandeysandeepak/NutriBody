package com.example.nutriengine.nutrienginemain.Services;

import com.example.nutriengine.nutrienginemain.Entity.Admin;
import com.example.nutriengine.nutrienginemain.Entity.User;
import com.example.nutriengine.nutrienginemain.Respositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class AdminService {
    @Autowired
    AdminRepository adminRepository;
    public Admin saveUser( Admin admin){
        return adminRepository.save(admin);
    }


}
