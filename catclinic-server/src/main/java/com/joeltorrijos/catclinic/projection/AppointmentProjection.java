package com.joeltorrijos.catclinic.projection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.joeltorrijos.catclinic.model.Appointment;

@Projection(name = "appointmentProjection", types = {Appointment.class})
public interface AppointmentProjection extends CustomLinkedAppointmentProjection {

	@Value("#{target.status.value}")
	String getStatus();
	
	@JsonIgnore
	boolean isPending();
	
	@JsonIgnore
	boolean isForPayment();
	
	@JsonIgnore
	boolean isCancellable();
}
