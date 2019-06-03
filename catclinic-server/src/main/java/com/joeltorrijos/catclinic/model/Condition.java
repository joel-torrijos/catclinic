package com.joeltorrijos.catclinic.model;

import javax.persistence.Entity;

/*
 * Entity for medical condition
 */
@Entity
public class Condition extends BaseEntity {

	private String name;
	private String description;
	
	public Condition() {
		
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
