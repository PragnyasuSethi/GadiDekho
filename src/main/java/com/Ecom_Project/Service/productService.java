package com.Ecom_Project.Service;

import com.Ecom_Project.Model.product;
import com.Ecom_Project.Repository.productRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class productService {


@Autowired
        private productRepository repo;
        public List<product> getAllProducts() {
            return repo.findAll();
        }
        public product getProductById(int id){
            return repo.findById(id).orElse(null);
        }

    public List<product> searchProducts(String keyword) {
            return repo.searchProducts(keyword);
    }

    public List<product> findCarsByCategory(String category){
        return repo.findCarsByCategory(category);
    }
}

