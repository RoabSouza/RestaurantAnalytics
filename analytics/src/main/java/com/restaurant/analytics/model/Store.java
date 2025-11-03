package com.restaurant.analytics.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "stores")
@Data
public class Store {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "brand_id")
    private Long brandId;
    
    @Column(name = "sub_brand_id")
    private Long subBrandId;
    
    @Column(nullable = false)
    private String name;
    
    private String city;
    
    private String state;
    
    private String district;
    
    @Column(name = "address_street")
    private String addressStreet;
    
    @Column(name = "address_number")
    private Integer addressNumber;
    
    private String zipcode;
    
    private BigDecimal latitude;
    
    private BigDecimal longitude;
    
    @Column(name = "is_active")
    private Boolean isActive;
    
    @Column(name = "is_own")
    private Boolean isOwn;
    
    @Column(name = "is_holding")
    private Boolean isHolding;
    
    @Column(name = "creation_date")
    private LocalDate creationDate;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}