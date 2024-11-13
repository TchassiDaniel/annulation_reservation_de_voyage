package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.RoleType;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.TypeUser;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public abstract class User implements UserDetails {

  @PrimaryKey
  private UUID userId;

  private String nom;
  private String email;
  private String password;
  private String telNumber;
  private RoleType role;
  private TypeUser typeUser;

  // Parametre pour un usager
  private String address;

  // Parametre pour une agence
  private UUID idcoordonneeGPS;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + this.role));
  }

  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public String getUsername() {
    return this.email;
  }

}
