package com.example.nutriengine.nutrienginemain.Controllers;


import com.example.nutriengine.nutrienginemain.Entity.Admin;
import com.example.nutriengine.nutrienginemain.Entity.User;
import com.example.nutriengine.nutrienginemain.Respositories.AdminRepository;
import com.example.nutriengine.nutrienginemain.Respositories.UserRepository;
import com.example.nutriengine.nutrienginemain.dto.LoginRequest;
import com.example.nutriengine.nutrienginemain.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
//import package com.example.nutriengine.nutrienginemain.dto.LoginRequest;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AdminRepository adminRepository;


    @PostMapping("/signUp")
    public ResponseEntity<Map<String, Object>> saveUser(@RequestBody User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Map<String, Object> response = new HashMap<>();
        if(user.getRoles().contains("user")){
            User savedUser = userRepository.save(user);
            response.put("user",savedUser);
        }else{
            Admin admin = Admin.builder()
                    .name(user.getName())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .password(user.getPassword())
                    .roles(user.getRoles())
                    .build();
            Admin savedAdmin = adminRepository.save(admin);
            response.put("admin",savedAdmin);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest){
        Map<String, Object> response = new HashMap<>();
        System.out.println("Role: "+ loginRequest.getRole());
        if(Objects.equals(loginRequest.getRole(), "user")) {
            User user = userRepository.findByEmail(loginRequest.getEmail());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: User not found with this email");
            }

            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Invalid Password");
            }

            String token = jwtUtil.generateToken(user.getEmail(), user.getRoles());


            response.put("token", token);
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("roles", loginRequest.getRole());
        }else{
            Admin admin = adminRepository.findByEmail(loginRequest.getEmail());
            if (admin == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Admin not found with this email");
            }

            if (!passwordEncoder.matches(loginRequest.getPassword(), admin.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Invalid Password");
            }

            String token = jwtUtil.generateToken(admin.getEmail(), admin.getRoles());

            response.put("token", token);
            response.put("username", admin.getUsername());
            response.put("email", admin.getEmail());
            response.put("roles", loginRequest.getRole());
        }

        return ResponseEntity.ok(response);
    }




}