package com.joeltorrijos.catclinic.service;

import java.util.List;

import com.joeltorrijos.catclinic.model.Appointment;

public interface AppointmentService {

	public Appointment diagnose(Long id, String notes, List<Integer> conditionIds);
	
	public Appointment cancel(Long id);
}
