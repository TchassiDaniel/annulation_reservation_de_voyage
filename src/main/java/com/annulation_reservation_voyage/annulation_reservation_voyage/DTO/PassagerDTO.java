package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PassagerDTO {
  String numeroPieceIdentific;
  String nom;
  String genre;
  int age;
  int nbrBaggage;
  int placeChoisis;
}
