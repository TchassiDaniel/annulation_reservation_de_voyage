package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.vehicule.VehiculeDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Vehicule;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.VehiculeRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.utils.PaginationUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class VehiculeService {
    private final VehiculeRepository vehiculeRepository;

    public VehiculeService(VehiculeRepository vehiculeRepository) {
        this.vehiculeRepository = vehiculeRepository;
    }

    public Page<Vehicule> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Slice<Vehicule> slice = vehiculeRepository.findAll(pageable);
        long total = vehiculeRepository.count();
        return PaginationUtils.SliceToPage(slice, total);
    }

    public Vehicule findById(UUID idVehicule) { return vehiculeRepository.findById(idVehicule).orElse(null); }

    public Page<Vehicule> findByIdAgenceVoyage(UUID idAgenceVoyage, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Slice<Vehicule> slice = vehiculeRepository.findByIdAgenceVoyage(idAgenceVoyage, pageable);
        long total = slice.getContent().size();
        return PaginationUtils.SliceToPage(slice, total);
    }

    public Vehicule create(VehiculeDTO vehiculeDTO) {
        Vehicule vehicule = new Vehicule();
        vehicule.setIdVehicule(UUID.randomUUID());
        vehicule.setNom(vehiculeDTO.getNom());
        vehicule.setModele(vehiculeDTO.getModele());
        vehicule.setNbrPlaces(vehiculeDTO.getNbrPlaces());
        vehicule.setIdAgenceVoyage(vehiculeDTO.getIdAgenceVoyage());
        return vehiculeRepository.save(vehicule);
    }

    public Vehicule update(UUID id, VehiculeDTO vehiculeDTO) {
        Vehicule vehicule = vehiculeRepository.findById(id).orElse(null);
        if (vehicule != null) {
            vehicule.setNom(vehiculeDTO.getNom());
            vehicule.setModele(vehiculeDTO.getModele());
            vehicule.setNbrPlaces(vehiculeDTO.getNbrPlaces());
            vehicule.setIdAgenceVoyage(vehiculeDTO.getIdAgenceVoyage());
            return vehiculeRepository.save(vehicule);
        }
        return null;
    }

    public void delete(UUID idVehicule) {vehiculeRepository.deleteById(idVehicule);}
}
