package com.bloodmatch.controller;

import com.bloodmatch.entity.Match;
import com.bloodmatch.service.MatchService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/matches")
@CrossOrigin(origins = "*")
public class MatchController {
    
    @Autowired
    private MatchService matchService;
    
    @GetMapping
    public ResponseEntity<List<Match>> getAllMatches() {
        List<Match> matches = matchService.getAllMatches();
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable Long id) {
        Optional<Match> match = matchService.getMatchById(id);
        return match.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Match> createMatch(@Valid @RequestBody Match match) {
        try {
            Match createdMatch = matchService.createMatch(match);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdMatch);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Match> updateMatch(@PathVariable Long id, @Valid @RequestBody Match matchDetails) {
        try {
            Match updatedMatch = matchService.updateMatch(id, matchDetails);
            return ResponseEntity.ok(updatedMatch);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatch(@PathVariable Long id) {
        try {
            matchService.deleteMatch(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/donor/{donorId}")
    public ResponseEntity<List<Match>> getMatchesByDonor(@PathVariable Long donorId) {
        List<Match> matches = matchService.getMatchesByDonor(donorId);
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/seeker/{seekerId}")
    public ResponseEntity<List<Match>> getMatchesBySeeker(@PathVariable Long seekerId) {
        List<Match> matches = matchService.getMatchesBySeeker(seekerId);
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/blood-group/{bloodGroup}")
    public ResponseEntity<List<Match>> getMatchesByBloodGroup(@PathVariable String bloodGroup) {
        List<Match> matches = matchService.getMatchesByBloodGroup(bloodGroup);
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Match>> getMatchesByStatus(@PathVariable String status) {
        List<Match> matches = matchService.getMatchesByStatus(status);
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Match>> getMatchesByUserId(@PathVariable Long userId) {
        List<Match> matches = matchService.getMatchesByUserId(userId);
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/find/{bloodGroup}/{location}")
    public ResponseEntity<List<Match>> findPotentialMatches(
            @PathVariable String bloodGroup, 
            @PathVariable String location) {
        List<Match> matches = matchService.findPotentialMatches(bloodGroup, location);
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/high-compatibility")
    public ResponseEntity<List<Match>> getHighCompatibilityMatches(@RequestParam(defaultValue = "80") Integer minScore) {
        List<Match> matches = matchService.getHighCompatibilityMatches(minScore);
        return ResponseEntity.ok(matches);
    }
    
    @PostMapping("/auto-match/{bloodGroup}")
    public ResponseEntity<String> createAutomaticMatches(@PathVariable String bloodGroup) {
        try {
            matchService.createAutomaticMatches(bloodGroup);
            return ResponseEntity.ok("Automatic matches created for blood group: " + bloodGroup);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Failed to create automatic matches");
        }
    }
}