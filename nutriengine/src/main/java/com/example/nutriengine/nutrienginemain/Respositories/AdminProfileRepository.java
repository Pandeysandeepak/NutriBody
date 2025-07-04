package com.example.nutriengine.nutrienginemain.Respositories;

import com.example.nutriengine.nutrienginemain.Entity.AdminProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminProfileRepository extends JpaRepository<AdminProfile, Long> {
    Optional<AdminProfile> findByEmail(String email);
}
