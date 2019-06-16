package com.joeltorrijos.catclinic.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.hateoas.core.Relation;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.joeltorrijos.catclinic.serializer.GenderSerializer;

@JsonSerialize(using = GenderSerializer.class)
@Relation(collectionRelation = "genders")
public enum Gender {
	MALE("Male"), FEMALE("Female");
	
	private String value;

	Gender(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
	
	public static List<Gender> orderedValues = new ArrayList<>();
	
	static {
		orderedValues.addAll(Arrays.asList(Gender.values()));
	}

}
