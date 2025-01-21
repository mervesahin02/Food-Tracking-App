package com.sydmerve.starter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
@EntityScan(basePackages = {"com.sydmerve"})
@ComponentScan(basePackages = {"com.sydmerve"})
@EnableJpaRepositories(basePackages = {"com.sydmerve"})
@SpringBootApplication
public class BeslenmeTakipApplication {

	public static void main(String[] args) {
		SpringApplication.run(BeslenmeTakipApplication.class, args);
	}

}
