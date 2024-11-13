package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.User;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

  private UserRepository userRepository;

  public List<User> findAll() {
    return userRepository.findAll();
  }

  public User findById(UUID id) {
    return userRepository.findById(id).orElse(null);
  }

  public User create(User user) {
    return userRepository.save(user);
  }

  public User update(User user) {
    return userRepository.save(user);
  }

  public void delete(UUID id) {
    userRepository.deleteById(id);
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return (UserDetails) this.userRepository.findByUsername(username);
  }

}
