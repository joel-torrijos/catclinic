package com.joeltorrijos.catclinic.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class PrescriptionId implements Serializable {
	
	@Column(name = "medicine_id")
	private Long medicineId;

	@Column(name = "appointment_id")
	private Long appointmentId;
	
	public PrescriptionId() { }

	public PrescriptionId(Long medicineId, Long appointmentId) {
		this.medicineId = medicineId;
		this.appointmentId = appointmentId;
	}

	public Long getAppointmentId() {
		return appointmentId;
	}
	
	public void setAppointmentId(Long appointmentId) {
		this.appointmentId = appointmentId;
	}
	
	public Long getMedicineId() {
		return medicineId;
	}
	
	public void setMedicineId(Long medicineId) {
		this.medicineId = medicineId;
	}
	
	@Override
	 public boolean equals(Object o) {
	    if (this == o)
	        return true;
	    if (o == null || getClass() != o.getClass())
	        return false;
	    PrescriptionId that = (PrescriptionId) o;
	    return Objects.equals(appointmentId, that.appointmentId) && Objects.equals(medicineId, that.medicineId);
	 }
	 
	@Override
	public int hashCode() {
	    return Objects.hash(appointmentId, medicineId);
	}
}
