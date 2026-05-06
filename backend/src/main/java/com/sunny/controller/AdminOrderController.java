package com.sunny.controller;

import com.sunny.model.Order;
import com.sunny.model.User;
import com.sunny.request.OrderRequest;
import com.sunny.service.OrderService;
import com.sunny.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;


    @GetMapping("/order/restaurant/{id}")
    public ResponseEntity<List<Order>> getOrderHistory(
            @PathVariable Long id,
            @RequestAttribute(required = false) String order_status,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user =userService.findUserByJwtToken(jwt);
        List<Order> order=orderService.getRestaurantsOrders(id,order_status);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PutMapping("/order/{id}/{orderStatus}")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long id,
            @PathVariable String orderStatus,
            @RequestAttribute(required = false) String order_status,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user =userService.findUserByJwtToken(jwt);
        Order order=orderService.updateOrder(id,orderStatus);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
