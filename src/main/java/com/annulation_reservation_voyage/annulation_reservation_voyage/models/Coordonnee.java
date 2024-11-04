package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Coordonnee {
  @PrimaryKey
  private String latitude;
  private String longitude;
  private String altitude;
}

