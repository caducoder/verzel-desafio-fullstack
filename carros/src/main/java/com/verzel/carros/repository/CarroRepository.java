package com.verzel.carros.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.verzel.carros.model.Carro;

public interface CarroRepository extends JpaRepository<Carro, Long> {

	Page<Carro> findAll(Pageable pageable);

}
