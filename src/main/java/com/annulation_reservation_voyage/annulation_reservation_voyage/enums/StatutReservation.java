package com.annulation_reservation_voyage.annulation_reservation_voyage.enums;

public enum StatutReservation {
  RESERVER, // Il a créer la reservation mais pas encore payé
  CONFIRMER, // Le Client à déjà tout payé
  ANNULER, // Le client à annuler la reservation, que ce soit avant ou après payement
  VALIDER
}
