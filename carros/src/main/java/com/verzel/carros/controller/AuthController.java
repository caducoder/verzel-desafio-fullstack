package com.verzel.carros.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.verzel.carros.dto.LoginDTO;
import com.verzel.carros.dto.LoginResponseDTO;
import com.verzel.carros.security.JwtTokenService;

@RestController
@RequestMapping("/login")
public class AuthController {

	@Autowired
	private JwtTokenService jwtTokenService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping
	public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO data) {

		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(data.email(), data.senha()));

		String token = jwtTokenService.generateToken(authentication);
		LoginResponseDTO tokenResponse = new LoginResponseDTO(token);

		return ResponseEntity.ok(tokenResponse);

	}
}
