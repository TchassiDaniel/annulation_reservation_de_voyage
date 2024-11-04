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
public class Usager {
  @PrimaryKey
  private UUID idUsager;
  private String nom;
  private String email;
  private String password;
  private String telNumber;
  private String address;
}
