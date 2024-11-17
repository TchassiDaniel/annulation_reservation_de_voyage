package com.annulation_reservation_voyage.annulation_reservation_voyage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@SpringBootApplication
public class AnnulationReservationVoyageApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnnulationReservationVoyageApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("*")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS");
			}
		};
	}

	@Bean
	public OpenAPI springShopOpenAPI() {
		return new OpenAPI()
				.info(new Info().title("Reservation Annulation Service")
						.description("Powerwed by 26GI")
						.version("v1")
						.license(new License().name("Apache 2.4.29").url("https://polytech.cm/")))
				.externalDocs(new ExternalDocumentation()
						.description("License of API")
						.url("https://polytech.cm/"));
	}
}
