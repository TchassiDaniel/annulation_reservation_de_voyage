package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation;

import java.time.LocalDateTime;
import java.util.UUID;

import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutReservation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
  int nbrPassager;
  double prixTotal;
  UUID idUser;
  UUID idVoyage;
}
