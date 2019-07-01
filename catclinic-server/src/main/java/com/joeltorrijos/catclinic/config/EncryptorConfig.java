package com.joeltorrijos.catclinic.config;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EncryptorConfig {
	
	@Value("${pbe_password}")
	String password;
	
	@Bean(name = "encryptorBean")
	public StandardPBEStringEncryptor config() {
		StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
		encryptor.setPassword(password);
		return encryptor;
	}

}
