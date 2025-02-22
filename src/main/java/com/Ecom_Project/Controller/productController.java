package com.Ecom_Project.Controller;

import com.Ecom_Project.Model.product;
import com.Ecom_Project.Service.productService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class productController {

    @Autowired
    private productService service;

    @GetMapping("/product")
    public List<product> getAllProduct(){
        return service.getAllProducts();
    }

    @GetMapping("/product/{id}")
    public product getProduct(@PathVariable int id){

        return service.getProductById(id);
    }

    @GetMapping("/product/search")
    public ResponseEntity<List<product>> searchProducts(@RequestParam String keyword){
        List<product> products = service.searchProducts(keyword);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }
    @GetMapping("/product/category/{category}")
    public ResponseEntity<List<product>> findCarsByCategory(@PathVariable String category){
        List<product> products = service.findCarsByCategory(category);
        return ResponseEntity.ok(products);
    }

@GetMapping("/new_cars")
    public List<product> UpcomingCars (){
        return List.of(
                new product ("Audi RS","The Audi RS is a high-performance luxury SUV that combines dynamic design with powerful performance, offering a blend of comfort and sportiness","Audi","23,000","SUV","nil"),
                new product("MG Majestor","The MG Majestor is an upcoming premium sedan from MG Motor, expected to feature advanced technology and a spacious interior, catering to the luxury segment","MG Motor","50,000","Sedan","nil"),
                new product("Maruti Suzuki e Vitara","The Maruti Suzuki e Vitara is the brand's first electric SUV, developed in partnership with Toyota. It offers 4WD capability and is equipped with lithium iron phosphate batteries, providing a range of up to 400 km per charge","Maruti Suzuki","15,000","SUV","nil")
        );
    }


}
