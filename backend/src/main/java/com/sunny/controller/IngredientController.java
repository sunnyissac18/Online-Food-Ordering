package com.sunny.controller;

import com.sunny.model.IngredientCategory;
import com.sunny.model.IngredientsItems;
import com.sunny.request.CreateIngredientRequest;
import com.sunny.request.IngredientRequest;
import com.sunny.service.IngredientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientController {

    @Autowired
    private IngredientsService ingredientsService;

    @PostMapping("/category")
    public ResponseEntity<IngredientCategory> createIngredientCategory(
            @RequestBody CreateIngredientRequest req
            ) throws Exception {

        IngredientCategory item=ingredientsService.createIngredientCategory(req.getName(),
                req.getRestaurantId());

        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PostMapping()
    public ResponseEntity<IngredientsItems> createIngredientItem(
            @RequestBody IngredientRequest req
    ) throws Exception {

        IngredientsItems item=ingredientsService.createIngredientItem(req.getRestaurantId(),req.getName(),req.getCategoryId());

        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }
    @PostMapping("/{id}/stock")
    public ResponseEntity<IngredientsItems> updateIngredientStock(
            @PathVariable Long id
    ) throws Exception {

        IngredientsItems item=ingredientsService.updateStock(id);

        return new ResponseEntity<>(item, HttpStatus.OK);
    }
    @GetMapping("/restaurant/{id}")
    public ResponseEntity<List<IngredientsItems>> getRestaurantIngredient(
            @PathVariable Long id
    ) throws Exception {

        List<IngredientsItems> items=ingredientsService.findRestaurantsIngredients(id);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }
    @GetMapping("/restaurant/{id}/category")
    public ResponseEntity<List<IngredientCategory>> getRestaurantIngredientCategory(
            @PathVariable Long id
    ) throws Exception {

        List<IngredientCategory> items=ingredientsService.findIngredientCategoryByRestaurantId(id);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }


}
