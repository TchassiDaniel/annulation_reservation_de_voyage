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
public class AgenceVoyage {
  @PrimaryKey
  private UUID idAgenceVoyage;
  private String nom;
  private String email;
  private String password;
  private UUID coordonneeGPS;
  private String telNumber;
}

