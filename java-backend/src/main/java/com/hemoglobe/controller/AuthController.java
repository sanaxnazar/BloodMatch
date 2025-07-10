package com.hemoglobe.controller;

import com.hemoglobe.entity.User;
import com.hemoglobe.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        
        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and password are required"));
        }
        
        Optional<User> userOptional = userService.getUserByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid credentials"));
        }
        
        User user = userOptional.get();
        
        // In a real application, you would verify the password hash
        // For this demo, we'll just return the user
        
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", "mock-jwt-token-" + user.getId());
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("user", createdUser);
            response.put("token", "mock-jwt-token-" + createdUser.getId());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        // In a real application, you would invalidate the JWT token
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}