package it.korea.app_boot.controller;




import org.springframework.web.bind.annotation.*;

import it.korea.app_boot.entity.Product;
import it.korea.app_boot.mapper.ProductMapper;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductMapper productMapper;

    public ProductController(ProductMapper productMapper) {
        this.productMapper = productMapper;
    }

    @GetMapping
    public List<Product> getAll() {
        return productMapper.findAll();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable Integer id) {
        return productMapper.findById(id);
    }

    @PostMapping
    public Product create(@RequestBody Product product) {
        productMapper.insert(product);
        return product;
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable Integer id, @RequestBody Product product) {
        product.setId(id);
        productMapper.update(product);
        return product;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        productMapper.delete(id);
    }
}

