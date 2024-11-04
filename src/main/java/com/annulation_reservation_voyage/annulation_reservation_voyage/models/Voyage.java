package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Voyage {
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
  private int nbrPlaceReservable;
  private int nbrPlaceReserve;
  private int nbrPlaceConfirm;
  private int nbrPlaceRestante;
  private LocalDate datePublication;
  private LocalDateTime dateLimiteReservation;
  private LocalDateTime dateLimiteConfirmation;
  private String statusVoyage;
}

