package com.hemoglobe.controller;

import com.hemoglobe.entity.User;
import com.hemoglobe.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.getUserByEmail(email);
        return user.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/blood-group/{bloodGroup}/{userType}")
    public ResponseEntity<List<User>> getUsersByBloodGroupAndType(
            @PathVariable String bloodGroup, 
            @PathVariable String userType) {
        List<User> users = userService.getUsersByBloodGroupAndType(bloodGroup, userType);
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/location/{location}/{userType}")
    public ResponseEntity<List<User>> getUsersByLocationAndType(
            @PathVariable String location, 
            @PathVariable String userType) {
        List<User> users = userService.getUsersByLocationAndType(location, userType);
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/donors/{bloodGroup}")
    public ResponseEntity<List<User>> getAvailableDonors(@PathVariable String bloodGroup) {
        List<User> donors = userService.getAvailableDonors(bloodGroup);
        return ResponseEntity.ok(donors);
    }
    
    @GetMapping("/seekers/{bloodGroup}")
    public ResponseEntity<List<User>> getAvailableSeekers(@PathVariable String bloodGroup) {
        List<User> seekers = userService.getAvailableSeekers(bloodGroup);
        return ResponseEntity.ok(seekers);
    }
}