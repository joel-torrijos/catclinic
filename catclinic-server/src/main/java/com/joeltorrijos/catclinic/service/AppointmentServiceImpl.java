package com.joeltorrijos.catclinic.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.joeltorrijos.catclinic.model.Appointment;
import com.joeltorrijos.catclinic.model.Appointment.Status;
import com.joeltorrijos.catclinic.model.Condition;
import com.joeltorrijos.catclinic.repository.AppointmentRepository;
import com.joeltorrijos.catclinic.repository.ConditionRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService {
	
	private AppointmentRepository appointmentRepository;
	
	private ConditionRepository conditionRepository;
	
	@Autowired
	public AppointmentServiceImpl(AppointmentRepository appointmentRepository,
			ConditionRepository conditionRepository) {
		this.appointmentRepository = appointmentRepository;
		this.conditionRepository = conditionRepository;
	}

	@Override
	public Appointment diagnose(Long id, String notes, List<Integer> conditionIds) {
		Appointment appointment = appointmentRepository.findById(id).get();
		
		appointment.setNotes(notes);
		
		appointment.getDiagnoses().clear();
		
		for(Integer conditionId : conditionIds) {
			Condition condition = conditionRepository.findById(Long.valueOf(conditionId.longValue())).get();
			appointment.getDiagnoses().add(condition);
		}
		
		appointment.setStatus(Status.FOR_PAYMENT);
		
		return appointmentRepository.save(appointment);
	}

	@Override
	public Appointment cancel(Long id) {
		Appointment appointment = appointmentRepository.findById(id).get();
		appointment.setStatus(Status.CANCELLED);
		return appointmentRepository.save(appointment);
	}

	@Override
	public Appointment pay(Long id, BigDecimal amountPaid) {
		Appointment appointment = appointmentRepository.findById(id).get();
		appointment.setAmountPaid(amountPaid);
		appointment.setStatus(Status.PAID);
		return appointmentRepository.save(appointment);
	}

	@Override
	public Page<Appointment> findByPatientId(Long id, Pageable pageable) {
		return appointmentRepository.findByPatient_Id(id, pageable);
	}

}
