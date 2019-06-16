package com.joeltorrijos.catclinic;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import com.joeltorrijos.catclinic.model.Appointment;
import com.joeltorrijos.catclinic.model.Condition;
import com.joeltorrijos.catclinic.model.Gender;
import com.joeltorrijos.catclinic.model.Patient;
import com.joeltorrijos.catclinic.model.Appointment.Status;
import com.joeltorrijos.catclinic.repository.AppointmentRepository;
import com.joeltorrijos.catclinic.repository.ConditionRepository;
import com.joeltorrijos.catclinic.repository.PatientRepository;

@Service
public class DataInitializer {
	
	private PatientRepository patientRepo;
	
	private ConditionRepository conditionRepo;
	
	private AppointmentRepository appointmentRepo;

	@Autowired
	public DataInitializer(PatientRepository patientRepo, ConditionRepository conditionRepo,
			AppointmentRepository appointmentRepo) {
		this.patientRepo = patientRepo;
		this.conditionRepo = conditionRepo;
		this.appointmentRepo = appointmentRepo;
	}
	
	@EventListener
	public void init(ApplicationReadyEvent event) {
		
		Patient kWest = new Patient("Kanye","West");
		kWest.setGender(Gender.MALE);
		Patient jTor = new Patient("Joel","Torrijos");
		jTor.setGender(Gender.MALE);
		Patient kimK = new Patient("Kim","Kardashian");
		kimK.setGender(Gender.FEMALE);
		Patient jayZ = new Patient("Jay","Z");
		jayZ.setGender(Gender.MALE);
		Patient kLeo = new Patient("Kawhi","Leonard");
		kLeo.setGender(Gender.MALE);
		
		patientRepo.saveAll(Arrays.asList(kWest,jTor,kimK,jayZ,kLeo));
		
		Condition stye = new Condition("Stye");
		Condition soreEyes = new Condition("Sore eyes");
		Condition swollenEars = new Condition("swollenEars");

		conditionRepo.saveAll(Arrays.asList(stye,soreEyes,swollenEars));
		
		Appointment a1 = new Appointment();
		a1.setPatient(kWest);
		
		Appointment a2 = new Appointment();
		a2.setPatient(jTor);
		a2.setDiagnoses(new HashSet<>());
		a2.getDiagnoses().addAll(Arrays.asList(stye,soreEyes));
		a2.setStatus(Status.FOR_PAYMENT);
		
		Appointment a3 = new Appointment();
		a3.setPatient(kimK);
		a3.setDiagnoses(new HashSet<>());
		a3.getDiagnoses().addAll(Arrays.asList(swollenEars));
		a3.setAmountPaid(BigDecimal.valueOf(100));
		a3.setStatus(Status.PAID);
		
		Appointment a4 = new Appointment();
		a4.setPatient(jayZ);
		
		Appointment a5 = new Appointment();
		a5.setPatient(kLeo);
		a5.setStatus(Status.CANCELLED);
		
		appointmentRepo.saveAll(Arrays.asList(a1,a2,a3,a4,a5));	
	}
}
