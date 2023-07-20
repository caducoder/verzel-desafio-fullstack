package com.verzel.carros.service;

import javax.persistence.EntityNotFoundException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.verzel.carros.dto.CarroDTO;
import com.verzel.carros.model.Carro;
import com.verzel.carros.repository.CarroRepository;

@Service
public class CarroService {

	@Autowired
	private CarroRepository carroRepository;
	
	@Autowired
	private ImageService imageService;

	public Page<Carro> getAll(Pageable pageable) {
		return carroRepository.findAll(pageable);
	}

	public Carro addCar(CarroDTO carroDto, MultipartFile imageFile) {
		ModelMapper mapper = new ModelMapper();
		Carro carro = mapper.map(carroDto, Carro.class);
		
		if(imageFile != null) {
			carro.setFoto(imageService.uploadToLocalFileSystem(imageFile));	
		}
		
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

	public Carro getById(Long id) {
		return carroRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Carro não encontrado."));
	}
}
