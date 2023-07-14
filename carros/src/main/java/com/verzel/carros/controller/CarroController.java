package com.verzel.carros.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
	
	@PostMapping(consumes =  {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_OCTET_STREAM_VALUE})
	public ResponseEntity<Carro> addCar(@RequestPart("car") CarroDTO carroDto, @RequestPart("image") MultipartFile file){
		return ResponseEntity.ok(carroService.addCar(carroDto, file));
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
