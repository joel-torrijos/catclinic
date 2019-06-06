package com.joeltorrijos.catclinic.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Appointment extends BaseEntity {

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="patient_id", nullable=false)
	private Patient patient;
	
	private String notes;

	@ManyToMany
	@JoinTable(name = "diagnosis",
			   joinColumns = @JoinColumn(name="appointment_id"),
			   inverseJoinColumns = @JoinColumn(name="condition_id"))
	private Set<Condition> diagnoses;

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Set<Condition> getDiagnoses() {
		return diagnoses;
	}

	public void setDiagnoses(Set<Condition> diagnoses) {
		this.diagnoses = diagnoses;
	}
	
	
	
	
}
