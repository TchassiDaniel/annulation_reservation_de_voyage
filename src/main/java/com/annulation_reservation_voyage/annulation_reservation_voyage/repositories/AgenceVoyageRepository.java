package com.annulation_reservation_voyage.annulation_reservation_voyage.repositories;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.AgenceVoyage;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AgenceVoyageRepository extends CassandraRepository<AgenceVoyage, UUID> {

}
