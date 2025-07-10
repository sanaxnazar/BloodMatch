package com.hemoglobe.repository;

import com.hemoglobe.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    
    List<Donation> findByDonorId(Long donorId);
    
    List<Donation> findBySeekerId(Long seekerId);
    
    List<Donation> findByBloodGroup(String bloodGroup);
    
    List<Donation> findByStatus(String status);
    
    List<Donation> findByUrgency(String urgency);
    
    @Query("SELECT d FROM Donation d WHERE d.donor.id = :userId OR d.seeker.id = :userId")
    List<Donation> findDonationsByUserId(@Param("userId") Long userId);
    
    @Query("SELECT d FROM Donation d WHERE d.bloodGroup = :bloodGroup AND d.status = :status")
    List<Donation> findByBloodGroupAndStatus(@Param("bloodGroup") String bloodGroup, @Param("status") String status);
    
    @Query("SELECT d FROM Donation d WHERE d.urgency = 'critical' AND d.status = 'pending'")
    List<Donation> findCriticalPendingDonations();
}