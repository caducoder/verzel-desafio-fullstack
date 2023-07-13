package com.verzel.carros.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.verzel.carros.model.Administrador;

@Repository
public interface AdminRepository extends JpaRepository<Administrador, Long>{

	Optional<UserDetails> findByEmail(String email);
}
