package com.restaurant.analytics.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class VendasPorDiaDTO {
    private LocalDate data;
    private Long quantidade;
    private BigDecimal total;

    public VendasPorDiaDTO() {}
    
    public VendasPorDiaDTO(LocalDate data, Long quantidade, BigDecimal total) {
        this.data = data;
        this.quantidade = quantidade;
        this.total = total;
    }
    
    public LocalDate getData() {
        return data;
    }
    
    public void setData(LocalDate data) {
        this.data = data;
    }
    
    public Long getQuantidade() {
        return quantidade;
    }
    
    public void setQuantidade(Long quantidade) {
        this.quantidade = quantidade;
    }
    
    public BigDecimal getTotal() {
        return total;
    }
    
    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}