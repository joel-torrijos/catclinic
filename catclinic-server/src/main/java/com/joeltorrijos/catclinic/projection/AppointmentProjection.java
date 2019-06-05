package com.joeltorrijos.catclinic.projection;

import org.springframework.data.rest.core.config.Projection;

import com.joeltorrijos.catclinic.model.Appointment;
import com.joeltorrijos.catclinic.model.Patient;

@Projection(name = "appointmentProjection", types = {Appointment.class})
public interface AppointmentProjection {

	String getNotes();
	
	Patient getPatient();
}
