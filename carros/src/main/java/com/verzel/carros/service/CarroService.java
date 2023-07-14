package com.verzel.carros.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.verzel.carros.dto.CarroDTO;
import com.verzel.carros.model.Carro;
import com.verzel.carros.repository.CarroRepository;

@Service
public class CarroService {

	@Autowired
	private CarroRepository carroRepository;

	public List<Carro> getAll() {
		return carroRepository.findAll();
	}

	public Carro addCar(CarroDTO carroDto) {
		ModelMapper mapper = new ModelMapper();
		Carro carro = mapper.map(carroDto, Carro.class);
		return carroRepository.save(carro);
	}
	
	public Carro updateCar(Long id, CarroDTO carroAtualizado) {
		ModelMapper mapper = new ModelMapper();
		Carro carroDb = carroRepository.findById(id).get();
		
		mapper.map(carroAtualizado, carroDb);
		
		return carroRepository.save(carroDb);
	}
	
	public void deleteCar(Long idCarro) {
		carroRepository.deleteById(idCarro);
	}
}
