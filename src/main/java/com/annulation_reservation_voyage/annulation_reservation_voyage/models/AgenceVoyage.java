package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import java.util.UUID;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Coordonnee;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgenceVoyage {
  private UUID idAgenceVoyage;
  private String nom;
  private String email;
  private String password;
  private Coordonnee coordonneeGPS;
  private String telNumber;
}

