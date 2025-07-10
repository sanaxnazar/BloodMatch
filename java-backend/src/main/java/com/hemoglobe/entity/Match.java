package com.hemoglobe.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
public class Match {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id")
    private User donor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seeker_id")
    private User seeker;

    @NotBlank(message = "Blood group is required")
    @Column(name = "blood_group")
    private String bloodGroup;

    private BigDecimal distance; // in miles/km

    @Min(value = 0, message = "Compatibility score must be at least 0")
    @Max(value = 100, message = "Compatibility score must be at most 100")
    @Column(name = "compatibility_score")
    private Integer compatibilityScore; // 0-100

    @NotBlank(message = "Status is required")
    private String status = "pending"; // 'pending', 'accepted', 'declined'

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Match() {}

    public Match(User donor, User seeker, String bloodGroup, BigDecimal distance, Integer compatibilityScore) {
        this.donor = donor;
        this.seeker = seeker;
        this.bloodGroup = bloodGroup;
        this.distance = distance;
        this.compatibilityScore = compatibilityScore;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // JPA Lifecycle callbacks
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getDonor() { return donor; }
    public void setDonor(User donor) { this.donor = donor; }

    public User getSeeker() { return seeker; }
    public void setSeeker(User seeker) { this.seeker = seeker; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public BigDecimal getDistance() { return distance; }
    public void setDistance(BigDecimal distance) { this.distance = distance; }

    public Integer getCompatibilityScore() { return compatibilityScore; }
    public void setCompatibilityScore(Integer compatibilityScore) { this.compatibilityScore = compatibilityScore; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}