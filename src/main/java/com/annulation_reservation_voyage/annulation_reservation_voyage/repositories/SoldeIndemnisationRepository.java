package com.annulation_reservation_voyage.annulation_reservation_voyage.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.SoldeIndemnisation;

@Repository
public interface SoldeIndemnisationRepository extends CassandraRepository<SoldeIndemnisation, UUID> {

    @AllowFiltering
    Optional<SoldeIndemnisation> findByIdUserAndIdAgenceVoyage(UUID idUser, UUID idAgenceVoyage);

}
