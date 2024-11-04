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
public class Passager {
  private UUID idPassager;
  private String numeroPieceIdentific;
  private String nom;
  private String prenom;
  private String genre;
  private int age;
  private int nbrBaggage;
}

