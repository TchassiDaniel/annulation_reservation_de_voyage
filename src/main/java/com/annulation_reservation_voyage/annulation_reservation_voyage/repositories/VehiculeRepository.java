package com.annulation_reservation_voyage.annulation_reservation_voyage.repositories;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Vehicule;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface VehiculeRepository extends CassandraRepository<Vehicule, UUID> {

    Slice<Vehicule> findByIdAgenceVoyage(UUID idAgenceVoyage, Pageable pageable);
}
