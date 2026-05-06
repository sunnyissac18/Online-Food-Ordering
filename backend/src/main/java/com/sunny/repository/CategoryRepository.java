package com.sunny.repository;

import com.sunny.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    public List<Category> findByRestaurantId(Long id);

    public Category findByNameAndRestaurantId(String name, Long restaurantId);

}
