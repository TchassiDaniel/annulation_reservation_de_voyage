package com.annulation_reservation_voyage.annulation_reservation_voyage.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Historique;

@Repository
public interface HistoriqueRepository extends CassandraRepository<Historique, UUID> {

    @AllowFiltering
    Optional<Historique> findByIdReservation(UUID idReservation);

}
