package com.annulation_reservation_voyage.annulation_reservation_voyage.repositories;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.ClassVoyage;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ClassVoyageRepository extends CassandraRepository<ClassVoyage, UUID> {

    Slice<ClassVoyage> findByIdAgenceVoyage(UUID id, Pageable pageable);
}
