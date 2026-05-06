package com.sunny.repository;

import com.sunny.model.IngredientsItems;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientItemRepository extends JpaRepository<IngredientsItems,Long> {

    List<IngredientsItems> findByRestaurantId(Long id);


}
