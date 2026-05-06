package com.sunny.repository;

import com.sunny.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,Long> {

    public Cart findByCustomerId(Long userId);

}
