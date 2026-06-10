package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class main {

	public static void main(String[] args) {
		SpringApplication.run(main.class, args);
		
	}
	@PostConstruct
    public void testEnv() {
        System.out.println("DB_URL = " + System.getenv("DB_URL"));
        System.out.println("DB_USERNAME = " + System.getenv("DB_USERNAME"));
    }

}
