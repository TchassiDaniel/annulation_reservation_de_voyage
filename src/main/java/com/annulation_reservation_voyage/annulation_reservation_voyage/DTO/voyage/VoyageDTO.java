package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VoyageDTO {
    private String titre;
    private String description;
    private Date dateDepartPrev;
    private String lieuDepart;
    private String lieuArrive;
    private Date heureDepartEffectif;
    private String dureeVoyage;
    private Date heureArrive;
    private Date datePublication;
    private Date dateLimiteReservation;
    private Date dateLimiteConfirmation;
    private String statusVoyage;
    private String smallImage;
    private String bigImage;
}
