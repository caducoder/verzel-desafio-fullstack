package com.verzel.carros.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.verzel.carros.dto.CarroDTO;
import com.verzel.carros.model.Carro;
import com.verzel.carros.service.CarroService;

@RestController
@RequestMapping("/carros")
public class CarroController {

	@Autowired
	private CarroService carroService;
	
	@GetMapping
	public ResponseEntity<Page<Carro>> getAll(@PageableDefault(sort = "valor") Pageable pageable){
		return ResponseEntity.ok(carroService.getAll(pageable));
	}
	
	@PostMapping
	public ResponseEntity<Carro> addCar(@RequestBody CarroDTO carroDto){
		System.out.println("Endpoint add car");
		return ResponseEntity.ok(carroService.addCar(carroDto));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Carro> updateCar(@PathVariable Long id, @RequestBody CarroDTO carroDto){
		return ResponseEntity.ok(carroService.updateCar(id, carroDto));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteCar(@PathVariable Long id){
		carroService.deleteCar(id);
		return ResponseEntity.ok("Carro removido com sucesso.");
	}
}
