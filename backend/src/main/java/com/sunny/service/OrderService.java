package com.sunny.service;

import com.sunny.model.Order;
import com.sunny.model.User;
import com.sunny.request.OrderRequest;

import java.util.List;

public interface OrderService {

    public Order createOrder(OrderRequest order, User user) throws Exception;

    public Order updateOrder(Long orderId, String orderStatus) throws Exception;

    public void cancelOrder(Long orderId) throws Exception;

    public List<Order> getUsersOrder(Long userId) throws Exception;

    public List<Order> getRestaurantsOrders(Long restaurantId, String orderStatus) throws Exception;

    public Order findOrderById(Long orderId) throws Exception;




}
