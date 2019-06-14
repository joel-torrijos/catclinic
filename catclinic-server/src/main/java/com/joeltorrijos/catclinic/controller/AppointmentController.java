package com.joeltorrijos.catclinic.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.joeltorrijos.catclinic.service.AppointmentService;

@RepositoryRestController
@RequestMapping("/appointments")
public class AppointmentController {
	
	@Autowired
	private AppointmentService appointmentService;
	
	@SuppressWarnings("unchecked")
	@PatchMapping(value = "/{id}/diagnose")
    public ResponseEntity<?> diagnose(@PathVariable Long id, @RequestBody Map<Object, Object> fields) {
		String notes = (String) fields.get("notes");
		List<Integer> conditionIds = (ArrayList<Integer>) fields.get("conditions");
		
		return ResponseEntity.ok(new Resource<>(appointmentService.diagnose(id, notes, conditionIds)));
    }
	
	@PostMapping(value = "/{id}/cancel")
    public ResponseEntity<?> cancel(@PathVariable Long id) {
		return ResponseEntity.ok(new Resource<>(appointmentService.cancel(id)));
    }

}
