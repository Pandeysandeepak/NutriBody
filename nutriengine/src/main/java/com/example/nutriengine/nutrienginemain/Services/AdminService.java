package com.example.nutriengine.nutrienginemain.Services;

import com.example.nutriengine.nutrienginemain.Entity.Admin;
import com.example.nutriengine.nutrienginemain.Entity.AdminProfile;
import com.example.nutriengine.nutrienginemain.Entity.User;
import com.example.nutriengine.nutrienginemain.Respositories.AdminProfileRepository;
import com.example.nutriengine.nutrienginemain.Respositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class  AdminService {
    @Autowired
    AdminRepository adminRepository;
    @Autowired
    AdminProfileRepository adminProfileRepository;

    public Admin saveUser( Admin admin){
        return adminRepository.save(admin);
    }

    public AdminProfile saveProfile( AdminProfile adminProfile){
        return adminProfileRepository.save(adminProfile);
    }


}
