package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
public class Voyage {
  @PrimaryKey
  private UUID idVoyage;
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
  private int nbrPlaceReservable;// Nbre de place qu'on peut encore reserve
  private int nbrPlaceReserve;// Nbre de place qu'on a reserve
  private int nbrPlaceConfirm;// Nbre de place qu'on a confirmer
  private int nbrPlaceRestante;//
  private LocalDate datePublication;
  private LocalDateTime dateLimiteReservation;
  private LocalDateTime dateLimiteConfirmation;
  private String statusVoyage;
  private String smallImage;
  private String bigImage;

}
