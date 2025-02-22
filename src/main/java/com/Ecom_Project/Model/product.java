package com.Ecom_Project.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;


    private String name;
    private String description;
    private String brand;
    private String price;
    private String category;
    private String imageUrl;

public product(){

}
    public product(String name, String description, String brand, String price, String category, String imageUrls){
        this.name=name;
        this.description=description;
        this.brand=brand;
        this.price=price;
        this.category = category;
        this.imageUrl = imageUrls;
    }

    public Integer getId() {
        return id;
    }

    public product setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public product setName(String name) {
        this.name = name;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public product setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getBrand() {
        return brand;
    }

    public product setBrand(String brand) {
        this.brand = brand;
        return this;
    }

    public String getPrice() {
        return price;
    }

    public product setPrice(String price) {
        this.price = price;
        return this;
    }

    public String getCategory() {
        return category;
    }

    public product setCategory(String category) {
        this.category = category;
        return this;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public product setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    @Override
    public String toString() {
        return "product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", brand='" + brand + '\'' +
                ", price=" + price +
                ", category='" + category + '\'' +
                ", imageUrls='" + imageUrl + '\'' +
                '}';
    }
}