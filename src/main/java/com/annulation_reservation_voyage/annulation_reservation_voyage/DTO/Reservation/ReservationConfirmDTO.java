package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation;

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
public class ReservationConfirmDTO {
  private UUID idReservation;
  private double montantPaye;
}
