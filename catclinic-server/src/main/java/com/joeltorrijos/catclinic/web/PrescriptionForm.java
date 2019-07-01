package com.joeltorrijos.catclinic.web;

public class PrescriptionForm {

	private String instructions;
	
	private Integer medicine;
	
	public PrescriptionForm(String instructions, Integer medicine) {
		this.instructions = instructions;
		this.medicine = medicine;
	}

	public String getInstructions() {
		return instructions;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}

	public Integer getMedicine() {
		return medicine;
	}

	public void setMedicine(Integer medicine) {
		this.medicine = medicine;
	}
	
	
}
