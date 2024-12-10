package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Utilisateur;

import java.util.UUID;

import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.RoleType;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO2 {
  private UUID userId;
  private String nom;
  private String prenom;
  private String username;
  private String telNumber;
  private RoleType role;

  // Parametre pour un usager
  private String address;

  // Parametre pour une agence
  private UUID idcoordonneeGPS;
}
