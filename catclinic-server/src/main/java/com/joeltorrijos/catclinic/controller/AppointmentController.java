package com.joeltorrijos.catclinic.controller;

import java.math.BigDecimal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.joeltorrijos.catclinic.projection.CustomLinkedAppointmentProjection;
import com.joeltorrijos.catclinic.service.AppointmentService;
import com.joeltorrijos.catclinic.web.DiagnosisForm;

@RepositoryRestController
@RequestMapping("/api/appointments")
@CrossOrigin
public class AppointmentController {
	
	@Autowired
	private AppointmentService appointmentService;
	
//	@SuppressWarnings("unchecked")
//	@PostMapping(value = "/{id}/diagnose")
//    public ResponseEntity<?> diagnose(@PathVariable Long id, @RequestBody Map<Object, Object> fields) {
//		String subjective = (String) fields.get("subjective");
//		String objective = (String) fields.get("objective");
//		List<Integer> conditionIds = (ArrayList<Integer>) fields.get("conditions");
//		List<Integer> procedureIds = (ArrayList<Integer>) fields.get("procedures");
//		List<Integer> prescriptions = (ArrayList<Integer>) fields.get("prescriptions");
//		
//		Resource<?> resource = new Resource<>(
//				(CustomLinkedAppointmentProjection) appointmentService.diagnose(id, subjective, objective, conditionIds, procedureIds, prescriptions));
//		
//		return ResponseEntity.ok(resource);
//    }
	
	@PostMapping(value = "/{id}/diagnose")
    public ResponseEntity<?> diagnose(@PathVariable Long id, @RequestBody DiagnosisForm form) {
		Resource<?> resource = new Resource<>(
				(CustomLinkedAppointmentProjection) appointmentService.diagnose(id, form));
		
		return ResponseEntity.ok(resource);
    }
	
	@PostMapping(value = "/{id}/cancel")
    public ResponseEntity<?> cancel(@PathVariable Long id) {
		return ResponseEntity.ok(new Resource<>(appointmentService.cancel(id)));
    }
	
	@PostMapping(value = "/{id}/pay")
    public ResponseEntity<?> pay(@PathVariable Long id, @RequestBody  Map<Object, Object> fields) {
		BigDecimal amountPaid = new BigDecimal((String) fields.get("amountPaid"));
		return ResponseEntity.ok(new Resource<>(appointmentService.pay(id, amountPaid)));
    }
	
}
