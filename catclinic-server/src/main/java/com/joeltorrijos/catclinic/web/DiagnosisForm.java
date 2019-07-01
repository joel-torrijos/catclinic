package com.joeltorrijos.catclinic.web;

import java.util.List;

public class DiagnosisForm {
	
	private String subjective;
	
	private String objective;
	
	private List<Integer> conditions;
	
	private List<Integer> procedures;
	
	private List<PrescriptionForm> prescription;
	
	public DiagnosisForm(String subjective, String objective, List<Integer> conditions, List<Integer> procedures,
			List<PrescriptionForm> prescription) {
		this.subjective = subjective;
		this.objective = objective;
		this.conditions = conditions;
		this.procedures = procedures;
		this.prescription = prescription;
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
	
	public List<Integer> getConditions() {
		return conditions;
	}
	
	public void setConditions(List<Integer> conditionIds) {
		this.conditions = conditionIds;
	}

	public List<Integer> getProcedures() {
		return procedures;
	}

	public void setProcedures(List<Integer> procedures) {
		this.procedures = procedures;
	}

	public List<PrescriptionForm> getPrescription() {
		return prescription;
	}

	public void setPrescription(List<PrescriptionForm> prescription) {
		this.prescription = prescription;
	}
	
}
