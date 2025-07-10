package com.hemoglobe.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(unique = true)
    private String email;

    private String phone;

    @NotBlank(message = "Blood group is required")
    @Column(name = "blood_group")
    private String bloodGroup;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 65, message = "Age must be at most 65")
    private Integer age;

    @DecimalMin(value = "45.0", message = "Weight must be at least 45 kg")
    private BigDecimal weight;

    @NotBlank(message = "User type is required")
    @Column(name = "user_type")
    private String userType; // 'donor' or 'seeker'

    @Column(name = "is_available")
    private Boolean isAvailable = true;

    @Column(name = "last_donation")
    private LocalDateTime lastDonation;

    @Column(name = "medical_conditions")
    private String medicalConditions;

    @Column(name = "emergency_contact")
    private String emergencyContact;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // One-to-many relationships
    @OneToMany(mappedBy = "donor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Donation> donatedDonations;

    @OneToMany(mappedBy = "seeker", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Donation> receivedDonations;

    @OneToMany(mappedBy = "donor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Match> donorMatches;

    @OneToMany(mappedBy = "seeker", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Match> seekerMatches;

    // Constructors
    public User() {}

    public User(String name, String email, String bloodGroup, String location, Integer age, String userType) {
        this.name = name;
        this.email = email;
        this.bloodGroup = bloodGroup;
        this.location = location;
        this.age = age;
        this.userType = userType;
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

    // UserDetails implementation
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return null; // We're not storing passwords in this simplified version
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isAvailable != null ? isAvailable : true;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public BigDecimal getWeight() { return weight; }
    public void setWeight(BigDecimal weight) { this.weight = weight; }

    public String getUserType() { return userType; }
    public void setUserType(String userType) { this.userType = userType; }

    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }

    public LocalDateTime getLastDonation() { return lastDonation; }
    public void setLastDonation(LocalDateTime lastDonation) { this.lastDonation = lastDonation; }

    public String getMedicalConditions() { return medicalConditions; }
    public void setMedicalConditions(String medicalConditions) { this.medicalConditions = medicalConditions; }

    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<Donation> getDonatedDonations() { return donatedDonations; }
    public void setDonatedDonations(List<Donation> donatedDonations) { this.donatedDonations = donatedDonations; }

    public List<Donation> getReceivedDonations() { return receivedDonations; }
    public void setReceivedDonations(List<Donation> receivedDonations) { this.receivedDonations = receivedDonations; }

    public List<Match> getDonorMatches() { return donorMatches; }
    public void setDonorMatches(List<Match> donorMatches) { this.donorMatches = donorMatches; }

    public List<Match> getSeekerMatches() { return seekerMatches; }
    public void setSeekerMatches(List<Match> seekerMatches) { this.seekerMatches = seekerMatches; }
}