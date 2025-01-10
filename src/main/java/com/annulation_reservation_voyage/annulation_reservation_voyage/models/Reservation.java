package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutReservation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
  @PrimaryKey
  private UUID idReservation;
  private LocalDateTime dateReservation;
  private LocalDateTime dateConfirmation;
  private int nbrPassager;
  private double montantPaye;
  private double prixTotal;
  private StatutReservation statutReservation;
  private UUID idUser;
  private UUID idVoyage;
}

