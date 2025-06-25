package com.example.nutriengine.nutrienginemain.Services;

import com.example.nutriengine.nutrienginemain.Entity.User;
import com.example.nutriengine.nutrienginemain.Respositories.UserRepository;
import com.example.nutriengine.nutrienginemain.dto.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//import package com.example.nutriengine.nutrienginemain.dto.LoginRequest;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @PostMapping("/signUp")
    public User saveUser(@RequestBody User user){
        return userRepository.save(user);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest){
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if (user == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: User not found with this email");
        }

        if(!user.getPassword().equals(loginRequest.getPassword())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Invalid Password");
        }

        return ResponseEntity.ok(user);
    }


}
