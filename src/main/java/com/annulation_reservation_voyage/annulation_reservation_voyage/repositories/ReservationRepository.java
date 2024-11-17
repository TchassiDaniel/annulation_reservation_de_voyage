package com.annulation_reservation_voyage.annulation_reservation_voyage.repositories;

import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Reservation;

@Repository
public interface ReservationRepository extends CassandraRepository<Reservation, UUID> {

}
