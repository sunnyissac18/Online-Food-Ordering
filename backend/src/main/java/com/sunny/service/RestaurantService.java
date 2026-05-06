package com.sunny.service;

import com.sunny.dto.RestaurantDto;
import com.sunny.model.Restaurant;
import com.sunny.model.User;
import com.sunny.request.CreateRestaurantRequest;

import java.util.List;

public interface RestaurantService {

    public Restaurant createRestaurant(CreateRestaurantRequest req, User user);

    public Restaurant updateRestaurant(Long restaurantId,
                                       CreateRestaurantRequest updateRestaurant) throws Exception;

    public void deleteRestaurant(Long restaurantId) throws Exception;

    public List<Restaurant> getAllRestaurant();

    public List<Restaurant> searchRestaurant(String keyword);

    public Restaurant findRestaurantById(Long id) throws Exception;

    Restaurant getRestaurantByUserId(Long userId) throws Exception;

    public RestaurantDto addToFavourites(Long restaurantId, User user) throws Exception;

    public Restaurant findRestaurantByUserId(Long userId) throws Exception;

    public Restaurant updateRestaurantStatus(Long id) throws Exception;



}
