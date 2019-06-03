package com.joeltorrijos.catclinic.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Appointment extends BaseEntity {

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="patient_id", nullable=false)
	private Patient patient;
	
	private String notes;

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
	
	
}
