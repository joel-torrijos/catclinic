package com.joeltorrijos.catclinic.projection;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.joeltorrijos.catclinic.model.Patient;

@Projection(name = "patientProjection", types = {Patient.class})
public interface PatientProjection {
	
	Long getId();
	
	LocalDateTime getCreatedDate();
	
	LocalDateTime getLastModifiedDate();
	
	String getFirstName();
	
	String getLastName();
	
	@Value("#{target.gender.getValue()}")
	String getGender();
	
	LocalDateTime getBirthDate();
}
