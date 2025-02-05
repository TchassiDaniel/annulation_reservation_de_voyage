package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import java.util.Date;
import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutPayement;
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
  private Date dateReservation;
  private Date dateConfirmation;
  private int nbrPassager;
  private double prixTotal;
  private StatutReservation statutReservation;
  private UUID idUser;
  private UUID idVoyage;

  // De quoi gérer le payement
  private StatutPayement statutPayement;
  private String transactionCode;
  private double montantPaye;

}
