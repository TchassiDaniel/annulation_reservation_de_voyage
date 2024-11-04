package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

  @Table
  @Data
  @AllArgsConstructor
  @NoArgsConstructor
public class Passager {
  @PrimaryKey
  private UUID idPassager;
  private String numeroPieceIdentific;
  private String nom;
  private String prenom;
  private String genre;
  private int age;
  private int nbrBaggage;
}

