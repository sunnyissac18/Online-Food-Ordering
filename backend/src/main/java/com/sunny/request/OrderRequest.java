package com.sunny.request;

import com.sunny.model.Address;
import lombok.Data;

@Data
public class OrderRequest {

    private Long restaurantId;
    private Address deliveryAddress;
}
