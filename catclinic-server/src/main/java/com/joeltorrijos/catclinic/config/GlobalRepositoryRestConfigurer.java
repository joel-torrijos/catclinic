package com.joeltorrijos.catclinic.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class GlobalRepositoryRestConfigurer extends RepositoryRestConfigurerAdapter {
	
	private static final String CORS_BASE_PATTERN = "/**";
	private static final String ALLOWED_ORIGINS = "*";
	private static final String ALLOWED_HEADERS = "*";
	private static final String ALLOWED_METHODS = "*";
	
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		config.getCorsRegistry()
			 .addMapping(CORS_BASE_PATTERN)
	         .allowedOrigins(ALLOWED_ORIGINS)
	         .allowedHeaders(ALLOWED_HEADERS)
	         .allowedMethods(ALLOWED_METHODS)
	         .allowCredentials(true);
	}
	
}
