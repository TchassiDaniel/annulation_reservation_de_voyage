package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VoyageDetailsDTO {
    private UUID idVoyage;
    private String titre;
    private String description;
    private Date dateDepartPrev;
    private String lieuDepart;
    private Date dateDepartEffectif;
    private Date dateArriveEffectif;
    private String lieuArrive;
    private Date heureDepartEffectif;
    private String dureeVoyage;
    private Date heureArrive;
    private int nbrPlaceReservable;
    private int nbrPlaceRestante;
    private Date datePublication;
    private Date dateLimiteReservation;
    private Date dateLimiteConfirmation;
    private String statusVoyage;
    private String smallImage;
    private String bigImage;
    private String nomClasseVoyage;
    private double prix;
    private String nomAgence;
    private String pointDeDepart;
}
