package com.restaurant.analytics.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "product_sales")
@Data
public class ProductSale {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "sale_id", nullable = false)
	private Long saleId;

	@Column(name = "product_id", nullable = false)
	private Long productId;

	@Column(nullable = false)
	private Float quantity;

	@Column(name = "base_price", nullable = false)
	private Float basePrice;

	@Column(name = "total_price", nullable = false)
	private Float totalPrice;

	@Column(length = 300)
	private String observations;
}