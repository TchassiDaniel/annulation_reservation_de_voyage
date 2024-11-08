package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Usager extends User{
  @PrimaryKey
  private UUID idUsager;
  private String address;
}
