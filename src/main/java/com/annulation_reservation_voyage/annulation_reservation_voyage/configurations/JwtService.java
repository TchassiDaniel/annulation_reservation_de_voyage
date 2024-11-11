package com.annulation_reservation_voyage.annulation_reservation_voyage.configurations;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import org.springframework.stereotype.Service;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.User;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.UsagerRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class JwtService {

  private UsagerRepository usagerRepository;

  private final String ENCRYPTION_KEY = "CmiiogvX6ILtIiRajQuYdYqh/Kh1Nou9BBMPVi/xgQslDTb3vJA2MPRgCM8/eGJr\n";

  public String generateJwt(String username) {

    User user = this.usagerRepository.findByUsername(username);

    Long currentTime = System.currentTimeMillis();
    Long expireTime = currentTime + 30 * 60 * 1000;

    Map<String, Object> claims = Map.of(
        "nom", user.getNom(),
        Claims.EXPIRATION, expireTime,
        Claims.SUBJECT, user.getUsername());

    final String bearer = Jwts.builder()
        .expiration(new Date(expireTime))
        .issuedAt(new Date(currentTime))
        .subject(user.getUsername())
        .claims(claims)
        .signWith(this.getKey(), SignatureAlgorithm.HS256)
        .compact();

    return "Bearer " + bearer;
  }

  private Key getKey() {
    final byte[] decoder = Decoders.BASE64.decode(ENCRYPTION_KEY);
    return Keys.hmacShaKeyFor(decoder);
  }

  public String extractUsername(String token) {
    return this.getAllClaims(token, Claims::getSubject);
  }

  public boolean isTokenExpired(String token) {
    Date expirationDate = this.getAllClaims(token, Claims::getExpiration);
    return expirationDate.before(new Date());
  }

  private <T> T getAllClaims(String token, Function<Claims, T> function) {
    Claims claims = this.getClaims(token);
    return function.apply(claims);
  }

  private Claims getClaims(String token) {
    return Jwts.parser()
        .setSigningKey(this.getKey())
        .build()
        .parseClaimsJws(token)
        .getBody();
  }
}
