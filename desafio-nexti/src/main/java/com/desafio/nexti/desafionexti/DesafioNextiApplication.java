package com.desafio.nexti.desafionexti;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class DesafioNextiApplication {

    public static void main(String[] args) {
        SpringApplication.run(DesafioNextiApplication.class, args);
    }

}
