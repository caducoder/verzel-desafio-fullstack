package com.verzel.carros.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.web.SecurityFilterChain;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import com.verzel.carros.service.AdminUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private RSAKey rsaKey;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();    
	}
	
	@Bean
    public AuthenticationManager authManager(AdminUserDetailsService userDetailsService) {
        var authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(authProvider);
    }

	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
        	.cors() // para permitir uma requisição preflight sem o cabeçalho de autorização
        	.and()
        	.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests((authz) -> authz
            	.antMatchers(HttpMethod.POST, "/auth/login").permitAll()
            	.antMatchers(HttpMethod.GET, "/carros").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
            .exceptionHandling((ex) -> ex
            		.authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
            		.accessDeniedHandler(new BearerTokenAccessDeniedHandler()));
			
        return http.build();
    }
	
	@Bean
    public JWKSource<SecurityContext> jwkSource() {
        rsaKey = Jwks.generateRsa();
        JWKSet jwkSet = new JWKSet(rsaKey);
        return (jwkSelector, securityContext) -> jwkSelector.select(jwkSet);
    }
	
	@Bean
    JwtEncoder jwtEncoder(JWKSource<SecurityContext> jwks) {
        return new NimbusJwtEncoder(jwks);
    }

    @Bean
    JwtDecoder jwtDecoder() throws JOSEException {
         return NimbusJwtDecoder.withPublicKey(rsaKey.toRSAPublicKey()).build();
    }
}
