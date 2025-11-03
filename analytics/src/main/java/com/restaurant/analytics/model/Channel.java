package com.restaurant.analytics.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "channels")
@Data
public class Channel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "brand_id")
	private Long brandId;

	@Column(nullable = false)
	private String name;

	private String description;

	@Column(length = 1)
	private String type;

	@Column(name = "created_at")
	private LocalDateTime createdAt;
}