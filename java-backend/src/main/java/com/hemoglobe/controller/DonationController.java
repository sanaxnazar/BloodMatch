package com.hemoglobe.controller;

import com.hemoglobe.entity.Donation;
import com.hemoglobe.service.DonationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/donations")
@CrossOrigin(origins = "*")
public class DonationController {
    
    @Autowired
    private DonationService donationService;
    
    @GetMapping
    public ResponseEntity<List<Donation>> getAllDonations() {
        List<Donation> donations = donationService.getAllDonations();
        return ResponseEntity.ok(donations);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Donation> getDonationById(@PathVariable Long id) {
        Optional<Donation> donation = donationService.getDonationById(id);
        return donation.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Donation> createDonation(@Valid @RequestBody Donation donation) {
        try {
            Donation createdDonation = donationService.createDonation(donation);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdDonation);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Donation> updateDonation(@PathVariable Long id, @Valid @RequestBody Donation donationDetails) {
        try {
            Donation updatedDonation = donationService.updateDonation(id, donationDetails);
            return ResponseEntity.ok(updatedDonation);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonation(@PathVariable Long id) {
        try {
            donationService.deleteDonation(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/donor/{donorId}")
    public ResponseEntity<List<Donation>> getDonationsByDonor(@PathVariable Long donorId) {
        List<Donation> donations = donationService.getDonationsByDonor(donorId);
        return ResponseEntity.ok(donations);
    }
    
    @GetMapping("/seeker/{seekerId}")
    public ResponseEntity<List<Donation>> getDonationsBySeeker(@PathVariable Long seekerId) {
        List<Donation> donations = donationService.getDonationsBySeeker(seekerId);
        return ResponseEntity.ok(donations);
    }
    
    @GetMapping("/blood-group/{bloodGroup}")
    public ResponseEntity<List<Donation>> getDonationsByBloodGroup(@PathVariable String bloodGroup) {
        List<Donation> donations = donationService.getDonationsByBloodGroup(bloodGroup);
        return ResponseEntity.ok(donations);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Donation>> getDonationsByStatus(@PathVariable String status) {
        List<Donation> donations = donationService.getDonationsByStatus(status);
        return ResponseEntity.ok(donations);
    }
    
    @GetMapping("/urgency/{urgency}")
    public ResponseEntity<List<Donation>> getDonationsByUrgency(@PathVariable String urgency) {
        List<Donation> donations = donationService.getDonationsByUrgency(urgency);
        return ResponseEntity.ok(donations);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Donation>> getDonationsByUserId(@PathVariable Long userId) {
        List<Donation> donations = donationService.getDonationsByUserId(userId);
        return ResponseEntity.ok(donations);
    }
    
    @GetMapping("/critical")
    public ResponseEntity<List<Donation>> getCriticalPendingDonations() {
        List<Donation> donations = donationService.getCriticalPendingDonations();
        return ResponseEntity.ok(donations);
    }
}