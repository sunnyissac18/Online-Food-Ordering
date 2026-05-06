package com.sunny.service;

import com.sunny.model.Category;
import com.sunny.model.Food;
import com.sunny.model.Restaurant;
import com.sunny.repository.CategoryRepository;
import com.sunny.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImp implements CategoryService {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public Category createCategory(String name, Long userId) throws Exception {

        Restaurant restaurant = restaurantService.getRestaurantByUserId(userId);
        Category category = new Category();
        category.setName(name);
        category.setRestaurant(restaurant);
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> findCategoryByRestaurantId(Long id) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(id);
        return categoryRepository.findByRestaurantId(id);
    }

    @Override
    public Category findCategoryById(Long id) throws Exception {

        Optional<Category> optionalCategory = categoryRepository.findById(id);

        if (optionalCategory.isEmpty()) {
            throw new Exception("category not found");
        }

        return optionalCategory.get();
    }

    @Override
    public void deleteCategory(Long id) throws Exception {
        Category category = findCategoryById(id);

        List<Food> foods = foodRepository.findByFoodCategoryId(category.getId());
        for (Food food : foods) {
            food.setFoodCategory(null);
            foodRepository.save(food);
        }

        categoryRepository.delete(category);
    }
}
