package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.classVoyage.ClassVoyageDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.ClassVoyage;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.ClassVoyageRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.utils.PaginationUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ClassVoyageService {

    private final ClassVoyageRepository classVoyageRepository;

    public ClassVoyageService(ClassVoyageRepository classVoyageRepository) {
        this.classVoyageRepository = classVoyageRepository;
    }
    
    public Page<ClassVoyage> findAll(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Slice<ClassVoyage> slice = classVoyageRepository.findAll(pageable);
        long total = classVoyageRepository.count();
        return PaginationUtils.SliceToPage(slice, total);
    }

    public ClassVoyage findById(UUID id) {return classVoyageRepository.findById(id).orElse(null);}

    public Page<ClassVoyage> findAllForAgence(UUID idAgence, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Slice<ClassVoyage> slice = classVoyageRepository.findByIdAgenceVoyage(idAgence, pageable);
        long total = slice.getContent().size();
        return PaginationUtils.SliceToPage(slice, total);
    }

    public ClassVoyage create(ClassVoyageDTO classVoyageDTO) {
        ClassVoyage classVoyage = new ClassVoyage();
        classVoyage.setIdClassVoyage(UUID.randomUUID());
        classVoyage.setNom(classVoyageDTO.getNom());
        classVoyage.setPrix(classVoyageDTO.getPrix());
        classVoyage.setTauxAnnulation(classVoyageDTO.getTauxAnnulation());
        classVoyage.setIdAgenceVoyage(classVoyageDTO.getIdAgenceVoyage());
        return classVoyageRepository.save(classVoyage);
    }

    public ClassVoyage update(UUID id, ClassVoyageDTO classVoyageDTO) {
        ClassVoyage classVoyage = classVoyageRepository.findById(id).orElse(null);
        if (classVoyage != null) {
            classVoyage.setNom(classVoyageDTO.getNom());
            classVoyage.setPrix(classVoyageDTO.getPrix());
            classVoyage.setTauxAnnulation(classVoyageDTO.getTauxAnnulation());
            classVoyage.setIdAgenceVoyage(classVoyageDTO.getIdAgenceVoyage());
            return classVoyageRepository.save(classVoyage);
        }
        return null;
    }

    public void delete(UUID id) {
        classVoyageRepository.deleteById(id);
    }

}
