package com.annulation_reservation_voyage.annulation_reservation_voyage.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Reservation;

@Repository
public interface ReservationRepository extends CassandraRepository<Reservation, UUID> {

    Optional<Reservation> findByIdUserAndIdVoyage(UUID IdUser, UUID IdVoyage);

    Slice<Reservation> findByIdUser(UUID idUser, Pageable pageable);

    List<Reservation> findByIdUser(UUID idUser);

    List<Reservation> findByIdVoyage(UUID idVoyage);
}
