package com.bloodmatch.service;

import com.bloodmatch.entity.Match;
import com.bloodmatch.entity.User;
import com.bloodmatch.repository.MatchRepository;
import com.bloodmatch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class MatchService {
    
    @Autowired
    private MatchRepository matchRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }
    
    public Optional<Match> getMatchById(Long id) {
        return matchRepository.findById(id);
    }
    
    public Match createMatch(Match match) {
        return matchRepository.save(match);
    }
    
    public Match updateMatch(Long id, Match matchDetails) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Match not found"));
        
        match.setBloodGroup(matchDetails.getBloodGroup());
        match.setDistance(matchDetails.getDistance());
        match.setCompatibilityScore(matchDetails.getCompatibilityScore());
        match.setStatus(matchDetails.getStatus());
        
        return matchRepository.save(match);
    }
    
    public void deleteMatch(Long id) {
        matchRepository.deleteById(id);
    }
    
    public List<Match> getMatchesByDonor(Long donorId) {
        return matchRepository.findByDonorId(donorId);
    }
    
    public List<Match> getMatchesBySeeker(Long seekerId) {
        return matchRepository.findBySeekerId(seekerId);
    }
    
    public List<Match> getMatchesByBloodGroup(String bloodGroup) {
        return matchRepository.findByBloodGroup(bloodGroup);
    }
    
    public List<Match> getMatchesByStatus(String status) {
        return matchRepository.findByStatus(status);
    }
    
    public List<Match> getMatchesByUserId(Long userId) {
        return matchRepository.findMatchesByUserId(userId);
    }
    
    public List<Match> getPendingMatchesByBloodGroup(String bloodGroup) {
        return matchRepository.findPendingMatchesByBloodGroup(bloodGroup);
    }
    
    public List<Match> getHighCompatibilityMatches(Integer minScore) {
        return matchRepository.findHighCompatibilityMatches(minScore);
    }
    
    public List<Match> findPotentialMatches(String bloodGroup, String location) {
        return matchRepository.findPendingMatchesByLocation(location);
    }
    
    /**
     * Create matches between available donors and seekers
     * This is a simplified matching algorithm
     */
    public void createAutomaticMatches(String bloodGroup) {
        List<User> donors = userRepository.findAvailableUsersByBloodGroupAndType(bloodGroup, "donor");
        List<User> seekers = userRepository.findAvailableUsersByBloodGroupAndType(bloodGroup, "seeker");
        
        for (User seeker : seekers) {
            for (User donor : donors) {
                // Simple compatibility scoring based on location similarity
                Integer compatibilityScore = calculateCompatibilityScore(donor, seeker);
                
                if (compatibilityScore >= 50) { // Only create matches with 50%+ compatibility
                    Match match = new Match();
                    match.setDonor(donor);
                    match.setSeeker(seeker);
                    match.setBloodGroup(bloodGroup);
                    match.setCompatibilityScore(compatibilityScore);
                    match.setDistance(calculateDistance(donor.getLocation(), seeker.getLocation()));
                    
                    matchRepository.save(match);
                }
            }
        }
    }
    
    private Integer calculateCompatibilityScore(User donor, User seeker) {
        int score = 0;
        
        // Blood group compatibility (base score)
        if (donor.getBloodGroup().equals(seeker.getBloodGroup())) {
            score += 50;
        }
        
        // Location proximity (simplified)
        if (donor.getLocation().toLowerCase().contains(seeker.getLocation().toLowerCase()) ||
            seeker.getLocation().toLowerCase().contains(donor.getLocation().toLowerCase())) {
            score += 30;
        }
        
        // Donor availability
        if (donor.getIsAvailable()) {
            score += 20;
        }
        
        return Math.min(score, 100); // Cap at 100
    }
    
    private BigDecimal calculateDistance(String location1, String location2) {
        // Simplified distance calculation - in a real app, you'd use a geo-coding service
        if (location1.equalsIgnoreCase(location2)) {
            return BigDecimal.ZERO;
        }
        
        // Return a random distance between 1-50 miles for demo purposes
        return BigDecimal.valueOf(Math.random() * 50 + 1);
    }
}