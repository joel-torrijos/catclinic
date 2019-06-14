package com.joeltorrijos.catclinic.projection;

import java.time.LocalDateTime;
import java.util.Set;

import com.joeltorrijos.catclinic.model.Condition;
import com.joeltorrijos.catclinic.model.Patient;

public interface CustomLinkedAppointmentProjection {
	
	Long getId();
	
	LocalDateTime getCreatedDate();
	
	LocalDateTime getLastModifiedDate();
	
	String getNotes();
	
	Patient getPatient();
	
	Set<Condition> getDiagnoses();
	
	boolean isPending();

	boolean isForPayment();
	
	boolean isCancellable();
}
