package com.restaurant.analytics.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "customers")
@Data
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "customer_name")
	private String customerName;

	private String email;

	@Column(name = "phone_number")
	private String phoneNumber;

	private String cpf;

	@Column(name = "birth_date")
	private LocalDate birthDate;

	private String gender;

	@Column(name = "store_id")
	private Long storeId;

	@Column(name = "sub_brand_id")
	private Long subBrandId;

	@Column(name = "registration_origin")
	private String registrationOrigin;

	@Column(name = "agree_terms")
	private Boolean agreeTerms;

	@Column(name = "receive_promotions_email")
	private Boolean receivePromotionsEmail;

	@Column(name = "receive_promotions_sms")
	private Boolean receivePromotionsSms;

	@Column(name = "created_at")
	private LocalDateTime createdAt;
}