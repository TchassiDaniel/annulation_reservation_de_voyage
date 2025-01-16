package com.annulation_reservation_voyage.annulation_reservation_voyage.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Passager;

@Repository
public interface PassagerRepository extends CassandraRepository<Passager, UUID> {

  @AllowFiltering
  List<Passager> findAllByIdReservation(UUID idReservation);
}
