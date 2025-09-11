package com.example.nutriengine.nutrienginemain.Controllers;

import com.example.nutriengine.nutrienginemain.Entity.Admin;
import com.example.nutriengine.nutrienginemain.Entity.AdminProfile;
import com.example.nutriengine.nutrienginemain.Respositories.AdminProfileRepository;
import com.example.nutriengine.nutrienginemain.Respositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    AdminProfileRepository adminProfileRepository;
    AdminRepository adminRepository;

    @PostMapping("/upload-profile-picture")
    public ResponseEntity<?> updateProfilePicture(@RequestParam("file") MultipartFile file, @RequestParam("email") String email){
        try {
            File uploadDir = new File("uploads/");
            if(!uploadDir.exists()) uploadDir.mkdir();
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get("uploads/",filename);
            Files.write(filePath,file.getBytes());

            String fileUrl = "http://localhost:8080/uploads/" + filename;

            System.out.println("Email for fetching "+email);
            AdminProfile profile = adminProfileRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("Admin not found"));
            profile.setProfilePictureUrl(fileUrl);
            adminProfileRepository.save(profile);

            return ResponseEntity.ok(Collections.singletonMap("url", fileUrl));
        }catch (IOException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

   @PostMapping("/save-data")
    public ResponseEntity<?> saveProfile(@RequestBody AdminProfile admin){
       Map<String, Object> response = new HashMap<>();
        if(adminProfileRepository.findByEmail(admin.getEmail()).equals(admin.getEmail())){
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Admin already exists");
        }else{
            AdminProfile adminProfile = adminProfileRepository.save(admin);
            response.put("created user", adminProfile);
        }

      return  ResponseEntity.status(HttpStatus.CREATED).body(response);
   }

   @GetMapping("/get-profile-picture")
    public ResponseEntity<?>  getProfileImage(@RequestParam String email){
        AdminProfile adminProfile = adminProfileRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("Admin not found"));
       System.out.println("Profile url "+ adminProfile.getProfilePictureUrl());
        if (adminProfile.getProfilePictureUrl() != null){
            return ResponseEntity.status(HttpStatus.OK).body(Collections.singletonMap("url", adminProfile.getProfilePictureUrl()));
        }else {
            return ResponseEntity.ok(" ");
        }

   }
}
