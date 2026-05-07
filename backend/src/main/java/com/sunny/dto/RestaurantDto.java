package com.sunny.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.List;

@Data
@Embeddable
public class RestaurantDto {

    private String title;

    @Column(length =1000)
    @jakarta.persistence.Convert(converter = com.sunny.config.StringListConverter.class)
    private List<String> images;

    private String description;
    private Long id;
}
