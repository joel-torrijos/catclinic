package com.joeltorrijos.catclinic.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.joeltorrijos.catclinic.model.Appointment;
import com.joeltorrijos.catclinic.web.DiagnosisForm;

public interface AppointmentService {

	public Appointment diagnose(Long id, String subjective, String objective, List<Integer> conditionIds);
	
	public Appointment diagnose(Long id, DiagnosisForm form);
	
	public Appointment cancel(Long id);
	
	public Appointment pay(Long id, BigDecimal amountPaid);
	
	public Page<Appointment> findByPatientId(Long id, Pageable pageable);
	
}
