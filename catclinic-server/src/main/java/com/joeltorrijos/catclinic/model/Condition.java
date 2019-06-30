package com.joeltorrijos.catclinic.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;

/*
 * Entity for medical condition
 */
@Entity
public class Condition extends BaseEntity {

	private String name;
	private String description;
	
	@ManyToMany(mappedBy="diagnoses")
	private Set<Appointment> appointments;
	
	public Condition() { }
	
	public Condition(String name) {
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

	public Set<Appointment> getAppointments() {
		return appointments;
	}

	public void setAppointments(Set<Appointment> appointments) {
		this.appointments = appointments;
	}
	
}
