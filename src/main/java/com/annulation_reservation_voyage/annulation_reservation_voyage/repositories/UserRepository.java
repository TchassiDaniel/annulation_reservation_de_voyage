package com.annulation_reservation_voyage.annulation_reservation_voyage.repositories;

import java.util.UUID;

import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.User;
import java.util.List;

@Repository
public interface UserRepository extends CassandraRepository<User, UUID> {

  User findByUsername(String username);

}
