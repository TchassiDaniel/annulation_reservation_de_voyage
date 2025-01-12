package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BilletDTO {
  private String titre;
  private String description;
  private LocalDate dateDepartPrev;
  private String lieuDepart;
  private LocalDate dateDepartEffectif;
  private LocalDate dateArriveEffectif;
  private String lieuArrive;
  private LocalTime heureDepartEffectif;
  private String dureeVoyage;
  private LocalTime heureArrive;
  private String statusVoyage;
  private String smallImage;
  private String bigImage;
  private String nomClasseVoyage;
  private double prix;
  private String nomAgence;
  private String pointDeDepart;
  String numeroPieceIdentific;
  String nom;
  String genre;
  int age;
  int nbrBaggage;
  int placeChoisis;
}
