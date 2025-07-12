package com.example.nutriengine.nutrienginemain.Controllers;


import com.example.nutriengine.nutrienginemain.Entity.Admin;
import com.example.nutriengine.nutrienginemain.Entity.User;
import com.example.nutriengine.nutrienginemain.Respositories.AdminRepository;
import com.example.nutriengine.nutrienginemain.Respositories.UserRepository;
import com.example.nutriengine.nutrienginemain.dto.LoginRequest;
import com.example.nutriengine.nutrienginemain.dto.SignupRequest;
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
@CrossOrigin(origins = "http://localhost:5173")
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
    public ResponseEntity<Map<String, Object>> saveUser(@RequestBody SignupRequest request) {
        Map<String, Object> response = new HashMap<>();

        if (request.getRoles() != null && request.getRoles().contains("user")) {
            User user = User.builder()
                    .name(request.getName())
                    .username(request.getUsername())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .roles(request.getRoles())
                    .build();
            User savedUser = userRepository.save(user);
            response.put("user", savedUser);
        } else {
            Admin admin = Admin.builder()
                    .name(request.getName())
                    .username(request.getUsername())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .build(); // no user.roles here!
            Admin savedAdmin = adminRepository.save(admin);
            response.put("admin", savedAdmin);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @PostMapping("/signin")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest){
        Map<String, Object> response = new HashMap<>();
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        String role = loginRequest.getRole().toString();

        String token;
        String value = String.valueOf(loginRequest.getRole().iterator().next());
        System.out.println("Role value "+value);
        if(Objects.equals(String.valueOf(loginRequest.getRole().iterator().next()), "user")) {
            User user = userRepository.findByEmail(email);
            if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password for user");
            }

            token = jwtUtil.generateToken(user.getEmail());

            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
        } else if(Objects.equals(loginRequest.getRole().iterator().next(), "admin"))  {
            Admin admin = adminRepository.findByEmail(email);
            if (admin == null || !passwordEncoder.matches(password, admin.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password for admin");
            }

            token = jwtUtil.generateToken(admin.getEmail());

            response.put("username", admin.getUsername());
            response.put("email", admin.getEmail());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid role specified.");
        }

        response.put("token", token);
        response.put("roles", role);

        return ResponseEntity.ok(response);
    }




}