package com.annulation_reservation_voyage.annulation_reservation_voyage.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Utilisateur.AuthentificationDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Utilisateur.UserDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Utilisateur.UserDTO2;
import com.annulation_reservation_voyage.annulation_reservation_voyage.configurations.JwtService;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.User;
import com.annulation_reservation_voyage.annulation_reservation_voyage.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Schema;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/utilisateur")
@AllArgsConstructor
public class UtilisateurController {

  private UserService userService;
  private AuthenticationManager authenticationManager;
  private JwtService jwtService;

  @PostMapping("/inscription")
  @Operation(summary = "Sign up a user")
  public ResponseEntity<User> inscription(@RequestBody UserDTO user) {

    User user1 = new User();

    user1.setNom(user.getNom());
    user1.setAddress(user.getAddress());
    user1.setEmail(user.getEmail());
    user1.setIdcoordonneeGPS(user.getIdcoordonneeGPS());
    user1.setPassword(user.getPassword());
    user1.setRole(user.getRole());
    user1.setTelNumber(user.getTelNumber());
    user1.setPrenom(user.getPrenom());

    User user2 = this.userService.create(user1);
    return new ResponseEntity<>(user2, HttpStatus.OK);
  }

  @PostMapping(path = "/connexion", consumes = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Get a token for an user")
  public ResponseEntity<String> getToken(@RequestBody AuthentificationDTO authentificationDTO) {
    String jwt = null;

    final Authentication authentication = this.authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(authentificationDTO.username(), authentificationDTO.password()));

    if (authentication.isAuthenticated()) {
      jwt = this.jwtService.generateJwt(authentificationDTO.username());
    }

    return new ResponseEntity<>(jwt, HttpStatus.OK);
  }

  @GetMapping("/profil/{token}")
  @Operation(summary = "Get a user information by token")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "User information", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDTO2.class))),
      @ApiResponse(responseCode = "404", description = "User not found") })
  public ResponseEntity<UserDTO2> getMethodName(@PathVariable String token) {
    String username = this.jwtService.extractUsername(token);
    User user = this.userService.findByUsername(username);
    if (user == null) {
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    } else {
      UserDTO2 userDTO2 = new UserDTO2();
      userDTO2.setUserId(user.getUserId());
      userDTO2.setAddress(user.getAddress());
      userDTO2.setUsername(user.getEmail());
      userDTO2.setIdcoordonneeGPS(user.getIdcoordonneeGPS());
      userDTO2.setNom(user.getNom());
      userDTO2.setPrenom(user.getPrenom());
      userDTO2.setRole(user.getRole());
      userDTO2.setTelNumber(user.getTelNumber());
      return new ResponseEntity<>(userDTO2, HttpStatus.OK);
    }
  }

}
