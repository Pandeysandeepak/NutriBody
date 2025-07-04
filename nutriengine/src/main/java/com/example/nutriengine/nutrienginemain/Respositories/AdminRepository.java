package com.example.nutriengine.nutrienginemain.Respositories;

import com.example.nutriengine.nutrienginemain.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByEmail(String email);
}
