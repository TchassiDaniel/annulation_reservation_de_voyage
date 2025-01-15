package com.annulation_reservation_voyage.annulation_reservation_voyage.mappers;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage.VoyageDetailsDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage.VoyagePreviewDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.ClassVoyage;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.User;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Vehicule;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Voyage;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class VoyageMapper {

    public VoyagePreviewDTO toVoyagePreviewDTO(Voyage voyage, User user, ClassVoyage classVoyage) {
        VoyagePreviewDTO voyagePreviewDTO = new VoyagePreviewDTO();
        voyagePreviewDTO.setIdVoyage(voyage.getIdVoyage());
        voyagePreviewDTO.setNomAgence(user.getNom()); // je suppose ici que le service c'est occupé de verifier que
                                                      // cette utilisateur est bien une agence
        voyagePreviewDTO.setLieuDepart(voyage.getLieuDepart());
        voyagePreviewDTO.setLieuArrive(voyage.getLieuArrive());
        voyagePreviewDTO.setNbrPlaceRestante(voyage.getNbrPlaceRestante());
        voyagePreviewDTO.setNbrPlaceReservable(voyage.getNbrPlaceReservable());
        voyagePreviewDTO.setDureeVoyage(voyage.getDureeVoyage());
        voyagePreviewDTO.setSmallImage(voyage.getSmallImage());
        voyagePreviewDTO.setBigImage(voyage.getBigImage());
        voyagePreviewDTO.setNomClasseVoyage(classVoyage.getNom());
        voyagePreviewDTO.setPrix(classVoyage.getPrix());
        return voyagePreviewDTO;
    }

    public VoyageDetailsDTO tovoyageDetailsDTO(Voyage voyage, User user, ClassVoyage classVoyage, Vehicule vehicule,
            List<Integer> placesReservees) {
        VoyageDetailsDTO voyageDetailsDTO = new VoyageDetailsDTO();
        voyageDetailsDTO.setIdVoyage(voyage.getIdVoyage());
        voyageDetailsDTO.setTitre(voyage.getTitre());
        voyageDetailsDTO.setDescription(voyage.getDescription());
        voyageDetailsDTO.setDateDepartPrev(voyage.getDateDepartPrev());
        voyageDetailsDTO.setLieuDepart(voyage.getLieuDepart());
        voyageDetailsDTO.setDateDepartEffectif(voyage.getDateDepartEffectif());
        voyageDetailsDTO.setDateArriveEffectif(voyage.getDateArriveEffectif());
        voyageDetailsDTO.setLieuArrive(voyage.getLieuArrive());
        voyageDetailsDTO.setHeureDepartEffectif(voyage.getHeureDepartEffectif());
        voyageDetailsDTO.setHeureArrive(voyage.getHeureArrive());
        voyageDetailsDTO.setDureeVoyage(voyage.getDureeVoyage());
        voyageDetailsDTO.setNbrPlaceReservable(voyage.getNbrPlaceReservable());
        voyageDetailsDTO.setNbrPlaceRestante(voyage.getNbrPlaceRestante());
        voyageDetailsDTO.setDatePublication(voyage.getDatePublication());
        voyageDetailsDTO.setDateLimiteConfirmation(voyage.getDateLimiteConfirmation());
        voyageDetailsDTO.setDateLimiteReservation(voyage.getDateLimiteReservation());
        voyageDetailsDTO.setStatusVoyage(voyage.getStatusVoyage());
        voyageDetailsDTO.setSmallImage(voyage.getSmallImage());
        voyageDetailsDTO.setBigImage(voyage.getBigImage());
        voyageDetailsDTO.setNomAgence(user.getNom());
        voyageDetailsDTO.setPrix(classVoyage.getPrix());
        voyageDetailsDTO.setNomClasseVoyage(classVoyage.getNom());
        voyageDetailsDTO.setPointDeDepart(voyage.getPointDeDepart());
        voyageDetailsDTO.setPointArrivee(voyage.getPointArrivee());
        voyageDetailsDTO.setVehicule(vehicule);
        voyageDetailsDTO.setPlaceReservees(placesReservees);
        return voyageDetailsDTO;
    }
}
