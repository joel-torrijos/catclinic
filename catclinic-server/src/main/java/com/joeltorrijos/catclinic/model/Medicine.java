package com.joeltorrijos.catclinic.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/*
 * Entity for prescribed medicines in an appointment
 */
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
public class Medicine extends BaseEntity {

	private String name;
	
	private String description;
	
	@OneToMany(mappedBy = "medicine")
    private Set<Prescription> prescription;
	
	public Medicine() { }
	
	public Medicine(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}

	public Set<Prescription> getPrescription() {
		return prescription;
	}

	public void setPrescription(Set<Prescription> prescription) {
		this.prescription = prescription;
	}
	
	
	
}
