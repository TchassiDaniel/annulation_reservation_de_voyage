package com.annulation_reservation_voyage.annulation_reservation_voyage.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.AuthentificationDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.configurations.JwtService;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.User;
import com.annulation_reservation_voyage.annulation_reservation_voyage.services.UserService;

import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/utilisateur")
@AllArgsConstructor
public class UtilisateurController {

  private UserService userService;
  private AuthenticationManager authenticationManager;
  private JwtService jwtService;

  @PostMapping("/inscription")
  public ResponseEntity<User> inscription(@RequestBody User user) {

    User user2 = this.userService.create(user);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @GetMapping("/connexion")
  public ResponseEntity<String> getToken(@RequestBody AuthentificationDTO authentificationDTO) {
    String jwt = null;

    final Authentication authentication = this.authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(authentificationDTO.username(), authentificationDTO.password()));

    if (authentication.isAuthenticated()) {
      jwt = this.jwtService.generateJwt(authentificationDTO.username());
    }

    return new ResponseEntity<>(jwt, HttpStatus.OK);
  }

}
