package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.RoleType;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public abstract class User implements UserDetails {

  private String nom;
  private String email;
  private String password;
  private String telNumber;
  private RoleType role;
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.singletonList(new SimpleGrantedAuthority("ROLE_"+this.role));
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
