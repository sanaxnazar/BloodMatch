package com.hemoglobe.repository;

import com.hemoglobe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    List<User> findByBloodGroupAndUserTypeAndIsAvailableTrue(String bloodGroup, String userType);
    
    List<User> findByLocationContainingIgnoreCaseAndUserTypeAndIsAvailableTrue(String location, String userType);
    
    @Query("SELECT u FROM User u WHERE u.bloodGroup = :bloodGroup AND u.userType = :userType AND u.isAvailable = true")
    List<User> findAvailableUsersByBloodGroupAndType(@Param("bloodGroup") String bloodGroup, @Param("userType") String userType);
    
    @Query("SELECT u FROM User u WHERE u.location LIKE %:location% AND u.userType = :userType AND u.isAvailable = true")
    List<User> findAvailableUsersByLocationAndType(@Param("location") String location, @Param("userType") String userType);
    
    boolean existsByEmail(String email);
}