package com.hemoglobe.repository;

import com.hemoglobe.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    
    List<Match> findByDonorId(Long donorId);
    
    List<Match> findBySeekerId(Long seekerId);
    
    List<Match> findByBloodGroup(String bloodGroup);
    
    List<Match> findByStatus(String status);
    
    @Query("SELECT m FROM Match m WHERE m.donor.id = :userId OR m.seeker.id = :userId")
    List<Match> findMatchesByUserId(@Param("userId") Long userId);
    
    @Query("SELECT m FROM Match m WHERE m.bloodGroup = :bloodGroup AND m.status = 'pending'")
    List<Match> findPendingMatchesByBloodGroup(@Param("bloodGroup") String bloodGroup);
    
    @Query("SELECT m FROM Match m WHERE m.compatibilityScore >= :minScore ORDER BY m.compatibilityScore DESC")
    List<Match> findHighCompatibilityMatches(@Param("minScore") Integer minScore);
    
    @Query("SELECT m FROM Match m WHERE m.donor.location LIKE %:location% AND m.seeker.location LIKE %:location% AND m.status = 'pending'")
    List<Match> findPendingMatchesByLocation(@Param("location") String location);
}