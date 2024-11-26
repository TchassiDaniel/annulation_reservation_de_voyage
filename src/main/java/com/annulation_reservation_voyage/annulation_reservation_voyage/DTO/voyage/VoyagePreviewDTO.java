package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// ce dto est là pour la liste des voyages
public class VoyagePreviewDTO {
    private UUID idVoyage;
    private String nomAgence;
    private String lieuDepart;
    private String lieuArrive;
    private int nbrPlaceRestante;
    private int nbrPlaceReservable;
    private String smallImage;
    private String bigImage;

}