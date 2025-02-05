package com.annulation_reservation_voyage.annulation_reservation_voyage.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {

  @Bean
  RestTemplate restTemplate() {
    return new RestTemplate();
  }
}
