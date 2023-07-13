package com.verzel.carros.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.verzel.carros.model.Administrador;
import com.verzel.carros.repository.AdminRepository;


@Component
public class CreateDefaultAdmin implements CommandLineRunner{

	@Autowired
	AdminRepository adminRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public void run(String... args) throws Exception {
		if(adminRepository.findByEmail("admin@verzel.com").isEmpty()) {
			Administrador adm = new Administrador("admin@verzel.com", passwordEncoder.encode("admin"));

			adminRepository.save(adm);
			
			System.out.println("----------- Admin padrão criado -----------");
		}
	}
}