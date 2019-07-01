package com.joeltorrijos.catclinic.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.joeltorrijos.catclinic.model.Prescription;

@Projection(name = "prescriptionProjection", types = {Prescription.class})
public interface PrescriptionProjection {
	
	@Value("#{target.medicine.name}")
	String getMedicine();
	
	String getInstructions();
}
