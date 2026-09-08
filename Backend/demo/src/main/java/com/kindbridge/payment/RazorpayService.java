package com.kindbridge.payment;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.kindbridge.dto.CreateOrderRequest;
import com.kindbridge.dto.CreateOrderResponse;
import com.kindbridge.dto.VerifyPaymentRequest;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;

@Service
public class RazorpayService {

    @Value("${razorpay.key}")
    private String key;

    @Value("${razorpay.secret}")
    private String secret;

    public CreateOrderResponse createOrder(CreateOrderRequest request) {

        try {

            RazorpayClient client = new RazorpayClient(key, secret);

            JSONObject options = new JSONObject();

            // Razorpay amount is in paisa
            options.put("amount", (int)(request.getAmount() * 100));

            options.put("currency", "INR");

            options.put("receipt", "receipt_" + System.currentTimeMillis());

            Order order = client.orders.create(options);

            return CreateOrderResponse.builder()
                    .orderId(order.get("id"))
                    .currency(order.get("currency"))
                    .amount(order.get("amount"))
                    .build();

        } catch (Exception e) {

            throw new RuntimeException("Unable to create Razorpay Order");
        }

    }
    


    public boolean verifyPayment(VerifyPaymentRequest request) {

        try {

            String payload =
                    request.getRazorpayOrderId() + "|" +
                    request.getRazorpayPaymentId();

            return Utils.verifySignature(
                    payload,
                    request.getRazorpaySignature(),
                    secret);

        } catch (Exception e) {
            return false;
        }

    }

}