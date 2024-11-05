package com.makesoft.MakeSoft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class for the MakeSoft application.
 * We never modify this file. We just run it
 */
@SpringBootApplication
public class MakeSoftApplication {

    /**
     * Main method to run the Spring Boot application.
     *
     * @param args command-line arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(MakeSoftApplication.class, args);
    }
}