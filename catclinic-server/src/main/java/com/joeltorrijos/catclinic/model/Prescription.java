package com.joeltorrijos.catclinic.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

@Entity
public class Prescription implements Serializable {
	
	@EmbeddedId
    private PrescriptionId id;
	
	@ManyToOne(fetch=FetchType.LAZY)
    @MapsId("medicineId")
    private Medicine medicine;

	@ManyToOne(fetch=FetchType.LAZY)
    @MapsId("appointmentId")
    private Appointment appointment;

    private String instructions;
    
    public Prescription() { }

	public Prescription(Medicine medicine, Appointment appointment, String instructions) {
		this.medicine = medicine;
		this.appointment = appointment;
		this.instructions = instructions;
		this.id = new PrescriptionId(medicine.getId(), appointment.getId());
	}

	public Appointment getAppointment() {
		return appointment;
	}

	public void setAppointment(Appointment appointment) {
		this.appointment = appointment;
	}

	public Medicine getMedicine() {
		return medicine;
	}

	public void setMedicine(Medicine medicine) {
		this.medicine = medicine;
	}

	public String getInstructions() {
		return instructions;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}
	
}
