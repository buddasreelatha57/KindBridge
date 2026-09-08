package com.kindbridge.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailService {


    private final JavaMailSender mailSender;


    public EmailService(JavaMailSender mailSender){

        this.mailSender = mailSender;

    }



    public void sendWelcomeEmail(String email, String name){


        SimpleMailMessage message =
                new SimpleMailMessage();


        message.setTo(email);


        message.setSubject(
            "Welcome to KindBridge ❤️"
        );


        message.setText(
            "Hello " + name + ",\n\n" +

            "Welcome to KindBridge!\n\n" +

            "Your account has been successfully registered.\n\n" +

            "Together, we can make a difference and help people in need.\n\n" +

            "Let's donate together and spread kindness ❤️\n\n" +

            "Thank you for joining KindBridge.\n\n" +

            "KindBridge Team"
        );


        mailSender.send(message);

    }

}