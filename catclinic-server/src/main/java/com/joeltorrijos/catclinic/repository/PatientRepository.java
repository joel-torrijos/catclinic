package com.joeltorrijos.catclinic.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import com.joeltorrijos.catclinic.model.Patient;

@RepositoryRestResource
public interface PatientRepository extends JpaRepository<Patient, Long> {

	@RestResource(path="name")
	List<Patient> findByFirstNameContainingOrLastNameContainingAllIgnoreCase(String firstName, String lastName, Pageable pageable);
	
}
