package com.bloodmatch.service;

import com.bloodmatch.entity.Donation;
import com.bloodmatch.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonationService {
    
    @Autowired
    private DonationRepository donationRepository;
    
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }
    
    public Optional<Donation> getDonationById(Long id) {
        return donationRepository.findById(id);
    }
    
    public Donation createDonation(Donation donation) {
        return donationRepository.save(donation);
    }
    
    public Donation updateDonation(Long id, Donation donationDetails) {
        Donation donation = donationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Donation not found"));
        
        donation.setBloodGroup(donationDetails.getBloodGroup());
        donation.setAmount(donationDetails.getAmount());
        donation.setDonationType(donationDetails.getDonationType());
        donation.setLocation(donationDetails.getLocation());
        donation.setStatus(donationDetails.getStatus());
        donation.setUrgency(donationDetails.getUrgency());
        donation.setScheduledDate(donationDetails.getScheduledDate());
        donation.setCompletedDate(donationDetails.getCompletedDate());
        
        return donationRepository.save(donation);
    }
    
    public void deleteDonation(Long id) {
        donationRepository.deleteById(id);
    }
    
    public List<Donation> getDonationsByDonor(Long donorId) {
        return donationRepository.findByDonorId(donorId);
    }
    
    public List<Donation> getDonationsBySeeker(Long seekerId) {
        return donationRepository.findBySeekerId(seekerId);
    }
    
    public List<Donation> getDonationsByBloodGroup(String bloodGroup) {
        return donationRepository.findByBloodGroup(bloodGroup);
    }
    
    public List<Donation> getDonationsByStatus(String status) {
        return donationRepository.findByStatus(status);
    }
    
    public List<Donation> getDonationsByUrgency(String urgency) {
        return donationRepository.findByUrgency(urgency);
    }
    
    public List<Donation> getCriticalPendingDonations() {
        return donationRepository.findCriticalPendingDonations();
    }
    
    public List<Donation> getDonationsByUserId(Long userId) {
        return donationRepository.findDonationsByUserId(userId);
    }
}