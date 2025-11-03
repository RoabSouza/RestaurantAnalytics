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
@Table(name = "products")
@Data
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "brand_id")
	private Long brandId;

	@Column(name = "sub_brand_id")
	private Long subBrandId;

	@Column(name = "category_id")
	private Long categoryId;

	@Column(nullable = false, length = 500)
	private String name;

	@Column(name = "pos_uuid")
	private String posUuid;

	@Column(name = "deleted_at")
	private LocalDateTime deletedAt;
}