package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation;

import java.util.UUID;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.PassagerDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
  private int nbrPassager;
  private double montantPaye;
  private UUID idUser;
  private UUID idVoyage;
  private PassagerDTO[] passagerDTO;
}
