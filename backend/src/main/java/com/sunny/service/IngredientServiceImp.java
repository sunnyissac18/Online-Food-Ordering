package com.sunny.service;

import com.sunny.model.IngredientCategory;
import com.sunny.model.IngredientsItems;
import com.sunny.model.Restaurant;
import com.sunny.repository.IngredientCategoryRepository;
import com.sunny.repository.IngredientItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientServiceImp implements IngredientsService{

    @Autowired
    private IngredientItemRepository ingredientItemRepository;
    @Autowired
    private IngredientCategoryRepository ingredientCategoryRepository;
    @Autowired
    private RestaurantService restaurantService;


    @Override
    public IngredientCategory createIngredientCategory(String name,
                                                       Long restaurantId) throws Exception {

        Restaurant restaurant=restaurantService.findRestaurantById(restaurantId);
        IngredientCategory category=new IngredientCategory();
        category.setRestaurant(restaurant);
        category.setName(name);

        return ingredientCategoryRepository.save(category);
    }

    @Override
    public IngredientCategory findIngredientCategoryById(Long id) throws Exception {

        Optional<IngredientCategory> opt=ingredientCategoryRepository.findById(id);
        if(opt.isEmpty()){
            throw new Exception("Ingredient Category Not found...");
        }

        return opt.get();
    }

    @Override
    public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long id) throws Exception {
        restaurantService.findRestaurantById(id);
        return ingredientCategoryRepository.findByRestaurantId(id);
    }

    @Override
    public IngredientsItems createIngredientItem(Long restaurantId,
                                                 String ingredientName,
                                                 Long categoryId) throws Exception {

        Restaurant restaurant=restaurantService.findRestaurantById(restaurantId);
        IngredientCategory category=findIngredientCategoryById(categoryId);

        IngredientsItems item=new IngredientsItems();
        item.setName(ingredientName);
        item.setRestaurant(restaurant);
        item.setCategory(category);

        IngredientsItems ingredient =ingredientItemRepository.save(item);
        category.getIngredients().add(ingredient);

        return ingredient;
    }

    @Override
    public List<IngredientsItems> findRestaurantsIngredients(Long restaurantId) throws Exception {

        return ingredientItemRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientsItems updateStock(Long id) throws Exception {

        Optional<IngredientsItems> opt=ingredientItemRepository.findById(id);

        if(opt.isEmpty()){
            throw new Exception("Ingredient not found");
        }
        IngredientsItems ingredientsItem=opt.get();
        ingredientsItem.setInStock(!ingredientsItem.isInStock());
        return ingredientItemRepository.save(ingredientsItem);
    }
}
