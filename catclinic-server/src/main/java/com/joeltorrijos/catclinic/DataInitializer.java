package com.joeltorrijos.catclinic;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import com.joeltorrijos.catclinic.model.Appointment;
import com.joeltorrijos.catclinic.model.Appointment.Status;
import com.joeltorrijos.catclinic.model.Condition;
import com.joeltorrijos.catclinic.model.Gender;
import com.joeltorrijos.catclinic.model.Medicine;
import com.joeltorrijos.catclinic.model.Patient;
import com.joeltorrijos.catclinic.model.Prescription;
import com.joeltorrijos.catclinic.model.Procedure;
import com.joeltorrijos.catclinic.repository.AppointmentRepository;
import com.joeltorrijos.catclinic.repository.ConditionRepository;
import com.joeltorrijos.catclinic.repository.MedicineRepository;
import com.joeltorrijos.catclinic.repository.PatientRepository;
import com.joeltorrijos.catclinic.repository.ProcedureRepository;

@Service
public class DataInitializer {
	
	private PatientRepository patientRepo;
	
	private ConditionRepository conditionRepo;
	
	private AppointmentRepository appointmentRepo;
	
	private ProcedureRepository procedureRepo;
	
	private MedicineRepository medicineRepo;

	@Autowired
	public DataInitializer(PatientRepository patientRepo, ConditionRepository conditionRepo,
			AppointmentRepository appointmentRepo, ProcedureRepository procedureRepo, 
			MedicineRepository medicineRepo) {
		this.patientRepo = patientRepo;
		this.conditionRepo = conditionRepo;
		this.appointmentRepo = appointmentRepo;
		this.procedureRepo = procedureRepo;
		this.medicineRepo = medicineRepo;
	}
	
	@EventListener
	public void init(ApplicationReadyEvent event) {
		
		List<Patient> patients = createPatients();
		List<Condition> conditions = createConditions();
		List<Procedure> procedures = createProcedures();
		List<Medicine> medicines = createMedicines();
		
		Appointment a1 = new Appointment();
		a1.setPatient(patients.get(0));
		
		Appointment a2 = new Appointment();
		a2.setPatient(patients.get(1));
		a2.setAssessment(new HashSet<>());
		a2.getAssessment().addAll(Arrays.asList(conditions.get(0),conditions.get(1)));
		a2.setStatus(Status.FOR_PAYMENT);
		
		Appointment a3 = new Appointment();
		a3.setPatient(patients.get(2));
		a3.setAssessment(new HashSet<>());
		a3.getAssessment().addAll(Arrays.asList(conditions.get(2)));
		a3.setAmountPaid(BigDecimal.valueOf(100));
		a3.setStatus(Status.PAID);
		
		Appointment a4 = new Appointment();
		a4.setPatient(patients.get(3));
		
		Appointment a5 = new Appointment();
		a5.setPatient(patients.get(4));
		a5.setStatus(Status.CANCELLED);
		
		Appointment a6 = new Appointment();
		a6.setPatient(patients.get(3));
		
		appointmentRepo.saveAll(Arrays.asList(a1,a2,a3,a4,a5,a6));	
	}
	
	private List<Patient> createPatients() {
		
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
		
		return patientRepo.saveAll(Arrays.asList(kWest,jTor,kimK,jayZ,kLeo));
	}
	
	private List<Condition> createConditions() {
		Condition stye = new Condition("Stye");
		Condition soreEyes = new Condition("Sore eyes");
		Condition swollenEars = new Condition("Swollen Ears");

		return conditionRepo.saveAll(Arrays.asList(stye,soreEyes,swollenEars));
	}
	
	private List<Procedure> createProcedures() {
		Procedure refraction = new Procedure("Refraction done");
		Procedure removalForeignBody = new Procedure("Removal of foreign body under local anesthesia");
		
		return procedureRepo.saveAll(Arrays.asList(refraction,removalForeignBody));
	}
	
	private List<Medicine> createMedicines() {
		Medicine vigamox = new Medicine("Vigamox Eye Drop");
		Medicine mefenamicAcid = new Medicine("Mefenamic Acid 500 g");
		Medicine vitaminB = new Medicine("Vitamin B Complex");
		
		return medicineRepo.saveAll(Arrays.asList(vigamox, mefenamicAcid, vitaminB));
	}
	
}
