package com.joeltorrijos.catclinic.projection;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

import com.joeltorrijos.catclinic.model.Appointment;
import com.joeltorrijos.catclinic.model.Condition;
import com.joeltorrijos.catclinic.model.Patient;

@Projection(name = "appointmentProjection", types = {Appointment.class})
public interface AppointmentProjection {

	String getNotes();
	
	Patient getPatient();
	
	Set<Condition> getDiagnoses();
}
