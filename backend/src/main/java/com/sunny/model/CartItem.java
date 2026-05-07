package com.sunny.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sunny.config.StringListConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "cart_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    private Cart cart;

    @ManyToOne
    private Food food;

    private int quantity;

    @Convert(converter = StringListConverter.class)
    @Column(length = 1000)
    private List<String> ingredients;

    private Long totalPrice;


}
