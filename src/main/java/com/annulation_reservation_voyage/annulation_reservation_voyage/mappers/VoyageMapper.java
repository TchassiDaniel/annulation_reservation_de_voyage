package com.annulation_reservation_voyage.annulation_reservation_voyage.mappers;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage.VoyagePreviewDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.AgenceVoyage;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Voyage;
import org.springframework.stereotype.Component;

@Component
public class VoyageMapper {

    public VoyagePreviewDTO toVoyagePreviewDTO(Voyage voyage, AgenceVoyage agenceVoyage) {
        VoyagePreviewDTO voyagePreviewDTO = new VoyagePreviewDTO();
        voyagePreviewDTO.setIdVoyage(voyage.getIdVoyage());
        voyagePreviewDTO.setNomAgence(agenceVoyage.getNom());
        voyagePreviewDTO.setLieuDepart(voyage.getLieuDepart());
        voyagePreviewDTO.setLieuArrive(voyage.getLieuArrive());
        voyagePreviewDTO.setNbrPlaceRestante(voyage.getNbrPlaceRestante());
        voyagePreviewDTO.setNbrPlaceReservable(voyage.getNbrPlaceReservable());
        voyagePreviewDTO.setSmallImage(voyage.getSmallImage());
        voyagePreviewDTO.setBigImage(voyage.getBigImage());
        return voyagePreviewDTO;
    }
}
