package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import java.util.UUID;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usager {
  private UUID idUsager;
  private String nom;
  private String email;
  private String password;
  private String telNumber;
  private String address;
}
