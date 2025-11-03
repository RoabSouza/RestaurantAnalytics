package com.restaurant.analytics.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "sales")
@Data
public class Sale {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "store_id", nullable = false)
	private Long storeId;

	@Column(name = "sub_brand_id")
	private Long subBrandId;

	@Column(name = "customer_id")
	private Long customerId;

	@Column(name = "channel_id", nullable = false)
	private Long channelId;

	@Column(name = "cod_sale1")
	private Long codSale1;

	@Column(name = "cod_sale2")
	private Long codSale2;

	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

	@Column(name = "customer_name")
	private String customerName;

	@Column(name = "sale_status_desc", nullable = false)
	private String saleStatusDesc;

	// Valores financeiros
	@Column(name = "total_amount_items", nullable = false)
	private BigDecimal totalAmountItems;

	@Column(name = "total_discount")
	private BigDecimal totalDiscount;

	@Column(name = "total_increase")
	private BigDecimal totalIncrease;

	@Column(name = "delivery_fee")
	private BigDecimal deliveryFee;

	@Column(name = "service_tax_fee")
	private BigDecimal serviceTaxFee;

	@Column(name = "total_amount", nullable = false)
	private BigDecimal totalAmount;

	@Column(name = "value_paid")
	private BigDecimal valuePaid;

	// Métricas operacionais
	@Column(name = "production_seconds")
	private Integer productionSeconds;

	@Column(name = "delivery_seconds")
	private Integer deliverySeconds;

	@Column(name = "people_quantity")
	private Integer peopleQuantity;

	@Column(name = "discount_reason", length = 300)
	private String discountReason;

	@Column(name = "increase_reason", length = 300)
	private String increaseReason;

	@Column(name = "origin")
	private String origin;

	private Integer peopleQuality;

	public Sale() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getStoreId() {
		return storeId;
	}

	public void setStoreId(Long storeId) {
		this.storeId = storeId;
	}

	public Long getSubBrandId() {
		return subBrandId;
	}

	public void setSubBrandId(Long subBrandId) {
		this.subBrandId = subBrandId;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		customerId = customerId;
	}

	public Long getChannelId() {
		return channelId;
	}

	public void setChannelId(Long channelId) {
		channelId = channelId;
	}

	public Long getCodSale1() {
		return codSale1;
	}

	public void setCodSale1(Long codSale1) {
		this.codSale1 = codSale1;
	}

	public Long getCodSale2() {
		return codSale2;
	}

	public void setCodSale2(Long codSale2) {
		this.codSale2 = codSale2;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public String getSaleStatusDesc() {
		return saleStatusDesc;
	}

	public void setSaleStatusDesc(String saleStatusDesc) {
		this.saleStatusDesc = saleStatusDesc;
	}

	public BigDecimal getTotalAmountIntems() {
		return getTotalAmountIntems();
	}

	public void setTotalAmountIntems(BigDecimal totalAmountIntems) {
		this.totalAmount = totalAmountIntems;
	}

	public BigDecimal getTotalDiscount() {
		return totalDiscount;
	}

	public void setTotalDiscount(BigDecimal totalDiscount) {
		this.totalDiscount = totalDiscount;
	}

	public BigDecimal getTotalIncrease() {
		return totalIncrease;
	}

	public void setTotalIncrease(BigDecimal totalIncrease) {
		this.totalIncrease = totalIncrease;
	}

	public BigDecimal getDeliveryFee() {
		return deliveryFee;
	}

	public void setDeliveryFee(BigDecimal deliveryFee) {
		this.deliveryFee = deliveryFee;
	}

	public BigDecimal getServiceTaxFee() {
		return serviceTaxFee;
	}

	public void setServiceTaxFee(BigDecimal serviceTaxFee) {
		this.serviceTaxFee = serviceTaxFee;
	}

	public BigDecimal getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}

	public BigDecimal getValuePaid() {
		return valuePaid;
	}

	public void setValuePaid(BigDecimal valuePaid) {
		this.valuePaid = valuePaid;
	}

	public Integer getProductionSeconds() {
		return productionSeconds;
	}

	public void setProductionSeconds(Integer productionSeconds) {
		this.productionSeconds = productionSeconds;
	}

	public Integer getDeliverySeconds() {
		return deliverySeconds;
	}

	public void setDeliverySeconds(Integer deliverySeconds) {
		this.deliverySeconds = deliverySeconds;
	}

	public Integer getPeopleQuality() {
		return getPeopleQuality();
	}

	public void setPeopleQuality(Integer peopleQuality) {
		this.peopleQuality = peopleQuality;
	}

	public String getDiscountReason() {
		return discountReason;
	}

	public void setDiscountReason(String discountReason) {
		discountReason = discountReason;
	}

	public String getIncreaseReason() {
		return increaseReason;
	}

	public void setIncreaseReason(String increaseReason) {
		increaseReason = increaseReason;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Sale other = (Sale) obj;
		return Objects.equals(id, other.id);
	}

}
