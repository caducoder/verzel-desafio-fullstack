package com.verzel.carros.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.verzel.carros.model.Carro;

public interface CarroRepository extends JpaRepository<Carro, Long> {

}
