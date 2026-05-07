package com.sunny.service;

import com.sunny.dto.RestaurantDto;
import com.sunny.model.Address;
import com.sunny.model.Restaurant;
import com.sunny.model.User;
import com.sunny.repository.*;
import com.sunny.request.CreateRestaurantRequest;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImp implements RestaurantService{

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Restaurant createRestaurant(CreateRestaurantRequest req, User user) {

        Address address=addressRepository.save(req.getAddress());

        Restaurant restaurant=new Restaurant();
        restaurant.setAddress(address);
        restaurant.setContactInformation(req.getContactInformation());
        restaurant.setCuisineType(req.getCuisineType());
        restaurant.setDescription(req.getDescription());
        restaurant.setImages(req.getImages());
        restaurant.setName(req.getName());
        restaurant.setOpeningHours(req.getOpeningHours());
        restaurant.setRegistrationDate(LocalDateTime.now());
        restaurant.setOwner(user);

        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception {

        Restaurant restaurant=findRestaurantById(restaurantId);

        if(restaurant.getCuisineType()!=null){
            restaurant.setCuisineType(updatedRestaurant.getCuisineType());
        }
        if(restaurant.getDescription()!=null){
            restaurant.setDescription(updatedRestaurant.getDescription());
        }
        if(restaurant.getName()!=null){
            restaurant.setName(updatedRestaurant.getName());
        }
        return restaurantRepository.save(restaurant);
    }

    @Override
    @Transactional
    public void deleteRestaurant(Long restaurantId) throws Exception {

        // 1. Clear foods_ingredients join table by food side
        entityManager.createNativeQuery(
                        "DELETE FROM foods_ingredients WHERE foods_id IN " +
                                "(SELECT id FROM foods WHERE restaurant_id = :id)")
                .setParameter("id", restaurantId)
                .executeUpdate();

        // 2. Clear foods_ingredients join table by ingredient side
        entityManager.createNativeQuery(
                        "DELETE FROM foods_ingredients WHERE ingredients_id IN " +
                                "(SELECT id FROM ingredient_items WHERE category_id IN " +
                                "(SELECT id FROM ingredient_categories WHERE restaurant_id = :id))")
                .setParameter("id", restaurantId)
                .executeUpdate();

        // 3. Clear order_items join table (orders -> order_items)
        entityManager.createNativeQuery(
                        "DELETE FROM order_items WHERE order_id IN " +
                                "(SELECT id FROM orders WHERE restaurant_id = :id)")
                .setParameter("id", restaurantId)
                .executeUpdate();

        // 4. Delete CartItems referencing this restaurant's foods
        entityManager.createQuery(
                        "DELETE FROM CartItem ci WHERE ci.food.restaurant.id = :id")
                .setParameter("id", restaurantId)
                .executeUpdate();

        // 5. JPA cascade handles the rest (orders, foods, categories, ingredients, etc.)
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new Exception("Restaurant not found"));
        restaurantRepository.delete(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurant() {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant findRestaurantById(Long id) throws Exception {
        Optional<Restaurant> opt=restaurantRepository.findById(id);

        if(opt.isEmpty()){
            throw new Exception("Restaurant Doesn't Exist with Id"+id);
        }
        return opt.get();
    }

    @Override
    public Restaurant findRestaurantByUserId(Long userId) throws Exception {
        return null;
    }

    @Override
    public Restaurant getRestaurantByUserId(Long userId) throws Exception {
        Restaurant restaurant=restaurantRepository.findByOwnerId(userId);
        if(restaurant==null){
            throw new Exception("Restaurant Doesn't Exist with Owner Id"+userId);
        }
        return restaurant;
    }

    @Override
    public RestaurantDto addToFavourites(Long restaurantId, User user) throws Exception {
        Restaurant restaurant=findRestaurantById(restaurantId);

        RestaurantDto dto= new RestaurantDto();

        dto.setDescription(restaurant.getDescription());
        dto.setImages(restaurant.getImages());
        dto.setTitle(restaurant.getName());
        dto.setId(restaurantId);

        boolean isFavourite=false;
        List<RestaurantDto> favourites =user.getFavourites();
        for(RestaurantDto favourite:favourites){
            if(favourite.getId().equals(restaurantId)){
                isFavourite=true;
                break;
            }
        }

        if(isFavourite){
            favourites.removeIf(favourite -> favourite.getId().equals(restaurantId));
        }else{
            favourites.add(dto);
        }

        userRepository.save(user);
        return dto;
    }

    @Override
    public Restaurant updateRestaurantStatus(Long id) throws Exception {

        Restaurant restaurant=findRestaurantById(id);
        restaurant.setOpen(!restaurant.isOpen());


        return restaurantRepository.save(restaurant);
    }
}
