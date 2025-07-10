package com.bloodmatch.service;

import com.bloodmatch.entity.User;
import com.bloodmatch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        return userRepository.save(user);
    }
    
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setName(userDetails.getName());
        user.setPhone(userDetails.getPhone());
        user.setBloodGroup(userDetails.getBloodGroup());
        user.setLocation(userDetails.getLocation());
        user.setAge(userDetails.getAge());
        user.setWeight(userDetails.getWeight());
        user.setUserType(userDetails.getUserType());
        user.setIsAvailable(userDetails.getIsAvailable());
        user.setLastDonation(userDetails.getLastDonation());
        user.setMedicalConditions(userDetails.getMedicalConditions());
        user.setEmergencyContact(userDetails.getEmergencyContact());
        
        return userRepository.save(user);
    }
    
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
    public List<User> getUsersByBloodGroupAndType(String bloodGroup, String userType) {
        return userRepository.findByBloodGroupAndUserTypeAndIsAvailableTrue(bloodGroup, userType);
    }
    
    public List<User> getUsersByLocationAndType(String location, String userType) {
        return userRepository.findByLocationContainingIgnoreCaseAndUserTypeAndIsAvailableTrue(location, userType);
    }
    
    public List<User> getAvailableDonors(String bloodGroup) {
        return userRepository.findAvailableUsersByBloodGroupAndType(bloodGroup, "donor");
    }
    
    public List<User> getAvailableSeekers(String bloodGroup) {
        return userRepository.findAvailableUsersByBloodGroupAndType(bloodGroup, "seeker");
    }
}