package com.verzel.carros.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
	public ResponseEntity<List<Carro>> getAll(){
		return ResponseEntity.ok(carroService.getAll());
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
