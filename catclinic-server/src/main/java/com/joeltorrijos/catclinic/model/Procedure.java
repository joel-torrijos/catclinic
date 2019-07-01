package com.joeltorrijos.catclinic.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;

/*
 * Entity for procedures done in an appointment
 */
@Entity
public class Procedure extends BaseEntity {

	private String name;
	
	private String description;
	
	@ManyToMany(mappedBy="procedures")
	private Set<Appointment> appointments;
	
	public Procedure() { }
	
	public Procedure(String name) {
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
