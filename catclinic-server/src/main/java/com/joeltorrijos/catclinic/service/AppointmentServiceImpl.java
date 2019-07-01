package com.joeltorrijos.catclinic.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.joeltorrijos.catclinic.model.Appointment;
import com.joeltorrijos.catclinic.model.Appointment.Status;
import com.joeltorrijos.catclinic.model.Condition;
import com.joeltorrijos.catclinic.model.Medicine;
import com.joeltorrijos.catclinic.model.Prescription;
import com.joeltorrijos.catclinic.model.Procedure;
import com.joeltorrijos.catclinic.projection.PrescriptionProjection;
import com.joeltorrijos.catclinic.repository.AppointmentRepository;
import com.joeltorrijos.catclinic.repository.ConditionRepository;
import com.joeltorrijos.catclinic.repository.MedicineRepository;
import com.joeltorrijos.catclinic.repository.ProcedureRepository;
import com.joeltorrijos.catclinic.web.DiagnosisForm;
import com.joeltorrijos.catclinic.web.PrescriptionForm;

@Service
public class AppointmentServiceImpl implements AppointmentService {
	
	private AppointmentRepository appointmentRepository;
	
	private ConditionRepository conditionRepository;
	
	private ProcedureRepository procedureRepository;
	
	private MedicineRepository medicineRepository;
	
	@Autowired
	public AppointmentServiceImpl(AppointmentRepository appointmentRepository, ConditionRepository conditionRepository, 
			ProcedureRepository procedureRepository, MedicineRepository medicineRepository) {
		this.appointmentRepository = appointmentRepository;
		this.conditionRepository = conditionRepository;
		this.procedureRepository = procedureRepository;
		this.medicineRepository = medicineRepository;
	}

	@Override
	public Appointment diagnose(Long id, String subjective, String objective, List<Integer> conditionIds) {
		Appointment appointment = appointmentRepository.findById(id).get();
//		Set<Condition> diagnoses = appointment.getDiagnoses();
		
		appointment.setSubjective(subjective);
		appointment.setObjective(objective);
		
//		diagnoses.clear();
//		
//		for(Integer conditionId : conditionIds) {
//			Condition condition = conditionRepository.findById(Long.valueOf(conditionId.longValue())).get();
//			appointment.getDiagnoses().add(condition);
//		}
		
		appointment.setStatus(Status.FOR_PAYMENT);
		
		return appointmentRepository.save(appointment);
	}
	
	@Override
	public Appointment diagnose(Long id, DiagnosisForm form) {
		Appointment appointment = appointmentRepository.findById(id).get();
		Set<Condition> assessment = appointment.getAssessment();
		Set<Procedure> procedures = appointment.getProcedures();
		Set<Prescription> prescription = appointment.getPrescription();
		
		appointment.setSubjective(form.getSubjective());
		appointment.setObjective(form.getObjective());
		
		assessment.clear();
		procedures.clear();
		prescription.clear();
		
		for(Integer conditionId : form.getConditions()) {
			Condition condition = conditionRepository.findById(Long.valueOf(conditionId.longValue())).get();
			assessment.add(condition);
		}
		
		for(Integer procedureId : form.getProcedures()) {
			Procedure procedure = procedureRepository.findById(Long.valueOf(procedureId.longValue())).get();
			procedures.add(procedure);
		}
		
		for(PrescriptionForm prescriptionForm : form.getPrescription()) {
			Medicine medicine = medicineRepository.findById(Long.valueOf(prescriptionForm.getMedicine())).get();
			Prescription newPrescription = new Prescription(medicine, appointment, prescriptionForm.getInstructions());
			prescription.add(newPrescription);
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
