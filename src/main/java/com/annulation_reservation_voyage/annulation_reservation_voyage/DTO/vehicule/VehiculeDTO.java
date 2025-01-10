package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.vehicule;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VehiculeDTO {
    private String nom;
    private String modele;
    private int nbrPlaces;
    private UUID idAgenceVoyage;
}
