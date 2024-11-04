package com.annulation_reservation_voyage.annulation_reservation_voyage.repositories;

import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Usager;

@Repository
public interface UsagerRepository extends CassandraRepository<Usager, UUID> {
  
}
