package com.joeltorrijos.catclinic.model;

import java.math.BigDecimal;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.joeltorrijos.catclinic.projection.CustomLinkedAppointmentProjection;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Appointment extends BaseEntity implements CustomLinkedAppointmentProjection {

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="patient_id", nullable=false)
	private Patient patient;
	
	private String notes;

	@ManyToMany
	@JoinTable(name = "diagnosis",
			   joinColumns = @JoinColumn(name="appointment_id"),
			   inverseJoinColumns = @JoinColumn(name="condition_id"))
	private Set<Condition> diagnoses;
	
	private Status status;
	
	private BigDecimal amountPaid;
	
	private String subjective;
	
	private String objective;
	
	public Appointment() {
		this.status = Status.PENDING;
	}

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
	
	public Status getStatus() {
		return status;
	}
	
	public BigDecimal getAmountPaid() {
		return amountPaid;
	}

	public void setAmountPaid(BigDecimal amountPaid) {
		this.amountPaid = amountPaid;
	}

	public String getSubjective() {
		return subjective;
	}

	public void setSubjective(String subjective) {
		this.subjective = subjective;
	}

	public String getObjective() {
		return objective;
	}

	public void setObjective(String objective) {
		this.objective = objective;
	}

	public boolean isPending() {
		return status.equals(Status.PENDING);
	}
	
	public boolean isForPayment() {
		return status.equals(Status.FOR_PAYMENT);
	}
	
	public boolean isCancellable() {
		return status.equals(Status.PENDING) || status.equals(Status.FOR_PAYMENT);
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public static enum Status {
		PENDING ("Pending"), 
		FOR_PAYMENT ("For Payment"), 
		PAID ("Paid"), 
		CANCELLED ("Cancelled");
		
		private String value;
		
		Status(String value) {
			this.value = value;
		}
		
		public String getValue() {
			return this.value;
		}
		
	}
	
}
