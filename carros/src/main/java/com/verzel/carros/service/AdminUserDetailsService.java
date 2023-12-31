package com.verzel.carros.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.verzel.carros.repository.AdminRepository;

@Service
public class AdminUserDetailsService implements UserDetailsService{

	@Autowired
	private AdminRepository adminRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		return adminRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException(""));
				
	}
}
