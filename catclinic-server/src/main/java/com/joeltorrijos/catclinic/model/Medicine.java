package com.joeltorrijos.catclinic.model;

import javax.persistence.Entity;

/*
 * Entity for prescribed medicines in an appointment
 */
@Entity
public class Medicine extends BaseEntity {

	private String name;
	
	private String description;
	
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
	
}
