package com.sunny.request;

import lombok.Data;

@Data
public class CreateIngredientRequest {

    private String name;
    private Long restaurantId;
}
