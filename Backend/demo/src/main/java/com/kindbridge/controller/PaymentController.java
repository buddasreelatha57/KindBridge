package com.kindbridge.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kindbridge.dto.CreateOrderRequest;
import com.kindbridge.dto.CreateOrderResponse;
import com.kindbridge.dto.VerifyPaymentRequest;
import com.kindbridge.payment.RazorpayService;
import com.kindbridge.service.DonationService;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin("*")
public class PaymentController {

    private final RazorpayService razorpayService;
    private final DonationService donationService;
    
    

    public PaymentController(RazorpayService razorpayService,DonationService donationService) {
        this.razorpayService = razorpayService;
        this.donationService = donationService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<CreateOrderResponse> createOrder(
            @RequestBody CreateOrderRequest request) {

        return ResponseEntity.ok(
                razorpayService.createOrder(request));
    }
  
    
    
    
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(
            @RequestBody VerifyPaymentRequest request) {

        boolean verified =
                razorpayService.verifyPayment(request);

        if (!verified) {

            return ResponseEntity
                    .badRequest()
                    .body("Payment Verification Failed");
        }

        return ResponseEntity.ok(
                donationService.saveDonation(request));
    }

}