package com.restaurant.analytics.repository;

import com.restaurant.analytics.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

	// QUERIES BÁSICAS (Contagem e Soma)
	@Query("SELECT COUNT(s) FROM Sale s WHERE s.createdAt BETWEEN :inicio AND :fim")
	Long countByPeriodo(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);

	@Query("SELECT COALESCE(SUM(s.totalAmount), 0) FROM Sale s WHERE s.createdAt BETWEEN :inicio AND :fim")
	BigDecimal sumTotalByPeriodo(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);

	// QUERIES AGREGADAS (Retornam múltiplas colunas)
	@Query(value = "SELECT c.name, " + "       c.type, " + "       COUNT(s.id), "
			+ "       COALESCE(SUM(s.total_amount), 0), " + "       CASE WHEN COUNT(s.id) > 0 "
			+ "            THEN COALESCE(SUM(s.total_amount), 0) / COUNT(s.id) " + "            ELSE 0 " + "       END "
			+ "FROM sales s " + "INNER JOIN channels c ON s.channel_id = c.id "
			+ "WHERE s.created_at BETWEEN :inicio AND :fim " + "GROUP BY c.id, c.name, c.type " + "ORDER BY 4 DESC",

			nativeQuery = true)
	List<Object[]> findVendasPorCanal(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);

	@Query(value = "SELECT EXTRACT(HOUR FROM created_at), " + "       COUNT(*), "
			+ "       COALESCE(SUM(total_amount), 0) " + "FROM sales " + "WHERE created_at BETWEEN :inicio AND :fim "
			+ "GROUP BY EXTRACT(HOUR FROM created_at) " + "ORDER BY 1", nativeQuery = true)
	List<Object[]> findVendasPorHora(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);

	@Query(value = "SELECT EXTRACT(DOW FROM created_at), " + "       COUNT(*), "
			+ "       COALESCE(SUM(total_amount), 0) " + "FROM sales " + "WHERE created_at BETWEEN :inicio AND :fim "
			+ "GROUP BY EXTRACT(DOW FROM created_at) " + "ORDER BY 1", nativeQuery = true)
	List<Object[]> findVendasPorDiaSemana(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);

	@Query(value = "SELECT st.id, " + "       st.name, " + "       st.city, " + "       st.state, "
			+ "       COUNT(s.id), " + "       COALESCE(SUM(s.total_amount), 0), " + "       CASE WHEN COUNT(s.id) > 0 "
			+ "            THEN COALESCE(SUM(s.total_amount), 0) / COUNT(s.id) " + "            ELSE 0 " + "       END "
			+ "FROM sales s " + "INNER JOIN stores st ON s.store_id = st.id "
			+ "WHERE s.created_at BETWEEN :inicio AND :fim " + "GROUP BY st.id, st.name, st.city, st.state "
			+ "ORDER BY 6 DESC " + "LIMIT :limit", nativeQuery = true)
	List<Object[]> findTopLojas(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim,
			@Param("limit") int limit);

	@Query(value = "SELECT p.id, " + "       p.name, " + "       COALESCE(SUM(ps.quantity), 0), "
			+ "       COALESCE(SUM(ps.total_price), 0) " + "FROM product_sales ps "
			+ "INNER JOIN products p ON ps.product_id = p.id " + "INNER JOIN sales s ON ps.sale_id = s.id "
			+ "WHERE s.created_at BETWEEN :inicio AND :fim " + "  AND p.deleted_at IS NULL " + "GROUP BY p.id, p.name "
			+ "ORDER BY 3 DESC " + "LIMIT :limit", nativeQuery = true)
	List<Object[]> findTopProdutos(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim,
			@Param("limit") int limit);

	@Query(value = "SELECT DATE(created_at), " + "       COUNT(*), " + "       COALESCE(SUM(total_amount), 0) "
			+ "FROM sales " + "WHERE created_at BETWEEN :inicio AND :fim " + "GROUP BY DATE(created_at) "
			+ "ORDER BY 1", nativeQuery = true)
	List<Object[]> findVendasPorDia(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);

}
