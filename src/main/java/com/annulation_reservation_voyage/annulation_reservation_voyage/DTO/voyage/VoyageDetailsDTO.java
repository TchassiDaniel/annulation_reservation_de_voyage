package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VoyageDetailsDTO {
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
    private int nbrPlaceRestante;
    private LocalDate datePublication;
    private LocalDateTime dateLimiteReservation;
    private LocalDateTime dateLimiteConfirmation;
    private String statusVoyage;
    private String smallImage;
    private String bigImage;
    private String nomClasseVoyage;
    private double prix;
    private String nomAgence;
}
