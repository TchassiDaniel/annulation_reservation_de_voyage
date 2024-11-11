package com.annulation_reservation_voyage.annulation_reservation_voyage.controllers;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.AuthentificationDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.User;

@Controller
@RequestMapping("/utilisateur")
public class UtilisateurController {

  @PostMapping("/inscription")
  public ResponseEntity<String> getMethodName(@RequestBody User user) {
    return new ResponseEntity<>(null, HttpStatus.OK);
  }

  @GetMapping("/connection")
  public ResponseEntity<String> getToken(@RequestBody AuthentificationDTO authentificationDTO) {
    return new ResponseEntity<>(null, HttpStatus.OK);
  }

}
