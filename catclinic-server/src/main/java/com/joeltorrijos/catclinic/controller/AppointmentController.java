package com.joeltorrijos.catclinic.controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.joeltorrijos.catclinic.model.Appointment;
import com.joeltorrijos.catclinic.model.Condition;
import com.joeltorrijos.catclinic.model.Appointment.Status;
import com.joeltorrijos.catclinic.repository.AppointmentRepository;
import com.joeltorrijos.catclinic.repository.ConditionRepository;

@RepositoryRestController
@RequestMapping("/appointments")
public class AppointmentController {
	
	@Autowired
	private AppointmentRepository appointmentRepository;
	
	@Autowired
	private ConditionRepository conditionRepository;
	
	
	@SuppressWarnings("unchecked")
	@PatchMapping(value = "/{id}/diagnose")
    public ResponseEntity<?> diagnose(@PathVariable Long id, @RequestBody Map<Object, Object> fields) {
		Appointment appointment = appointmentRepository.findById(id).get();
		
		appointment.setNotes((String) fields.get("notes"));
		
		appointment.getDiagnoses().clear();
		
		for(Integer conditionId : (ArrayList<Integer>) fields.get("conditions")) {
			Condition condition = conditionRepository.findById(Long.valueOf(conditionId.longValue())).get();
			appointment.getDiagnoses().add(condition);
		}
		
		appointment.setStatus(Status.FOR_PAYMENT);
		
		appointmentRepository.save(appointment);
		
		return ResponseEntity.ok(new Resource<>(appointment));
    }

}
