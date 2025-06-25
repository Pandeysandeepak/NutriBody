package com.example.nutriengine.nutrienginemain.Respositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.nutriengine.nutrienginemain.Entity.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

}
