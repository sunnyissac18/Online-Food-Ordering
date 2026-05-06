package com.sunny.service;

import com.stripe.exception.StripeException;
import com.sunny.model.Order;
import com.sunny.response.PaymentResponse;

public interface PaymentService {
    public PaymentResponse createPaymentLink(Order order) throws StripeException;
}
