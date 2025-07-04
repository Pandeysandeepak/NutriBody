package com.example.nutriengine.nutrienginemain.Controllers;

import com.example.nutriengine.nutrienginemain.Entity.AdminProfile;
import com.example.nutriengine.nutrienginemain.Respositories.AdminProfileRepository;
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
import java.util.UUID;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    AdminProfileRepository adminProfileRepository;

    @PostMapping("/upload-profile-picture")
    public ResponseEntity<?> updateProfilePicture(@RequestParam("file") MultipartFile file, @RequestParam("email") String email){
        try {
            File uploadDir = new File("uploads/");
            if(!uploadDir.exists()) uploadDir.mkdir();
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get("uploads/",filename);
            Files.write(filePath,file.getBytes());

            String fileUrl = "http://localhost:8080/uploads/" + filename;

            AdminProfile profile = adminProfileRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("Admin not found"));
            profile.setProfilePictureUrl(fileUrl);
            adminProfileRepository.save(profile);

            return ResponseEntity.ok(Collections.singletonMap("url", fileUrl));
        }catch (IOException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
