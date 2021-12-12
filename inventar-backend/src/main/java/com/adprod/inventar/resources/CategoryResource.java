package com.adprod.inventar.resources;

import com.adprod.inventar.models.Book;
import com.adprod.inventar.models.SpendingCategory;
import com.adprod.inventar.models.utils.Comparator;
import com.adprod.inventar.models.utils.Subtractive;
import com.adprod.inventar.services.BookService;
import com.adprod.inventar.services.CategoryService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryResource {
    private final CategoryService categoryService;
    public CategoryResource(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping(value = "", produces = "application/json")
    public ResponseEntity findAll(Pageable pageable){
        return categoryService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity findOne(@PathVariable String id){
        return categoryService.findOne(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable String id){
        return categoryService.delete(id);
    }

    @PostMapping
    public ResponseEntity save(@RequestBody SpendingCategory spendingCategory){
        return categoryService.save(spendingCategory);
    }

    @PutMapping
    public ResponseEntity update(@RequestBody SpendingCategory spendingCategory) {
        return categoryService.update(spendingCategory);
    }

}
