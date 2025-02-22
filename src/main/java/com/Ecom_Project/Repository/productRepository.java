package com.Ecom_Project.Repository;

import com.Ecom_Project.Model.product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface productRepository extends JpaRepository<product, Integer> {

    // this is for Search with Relatable keyword
    @Query("SELECT p FROM product p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<product> searchProducts(@Param("keyword") String keyword);

    @Query("SELECT p FROM product p WHERE LOWER(p.category) LIKE LOWER(CONCAT('%', :category, '%'))")
    List<product> findCarsByCategory(@Param("category") String category);
}
