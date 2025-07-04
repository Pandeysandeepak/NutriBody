package com.example.nutriengine.nutrienginemain.Respositories;

import com.example.nutriengine.nutrienginemain.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
