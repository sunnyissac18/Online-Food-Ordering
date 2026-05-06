package com.sunny.controller;

import com.sunny.model.CartItem;
import com.sunny.model.Order;
import com.sunny.model.User;
import com.sunny.request.AddCartItemRequest;
import com.sunny.request.OrderRequest;
import com.sunny.response.PaymentResponse;
import com.sunny.service.OrderService;
import com.sunny.service.PaymentService;
import com.sunny.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
    @Autowired
    private PaymentService paymentService;

    @PutMapping("/order")
    public ResponseEntity<PaymentResponse> createOrder(
            @RequestBody OrderRequest req,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user =userService.findUserByJwtToken(jwt);
        Order order=orderService.createOrder(req,user);
        PaymentResponse response=paymentService.createPaymentLink(order);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getOrderHistory(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user =userService.findUserByJwtToken(jwt);
        List<Order> order=orderService.getUsersOrder(user.getId());
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
