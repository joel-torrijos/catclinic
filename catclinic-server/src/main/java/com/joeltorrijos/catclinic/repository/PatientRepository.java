package com.joeltorrijos.catclinic.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import com.joeltorrijos.catclinic.model.Patient;
import com.joeltorrijos.catclinic.model.QPatient;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.StringPath;

@RepositoryRestResource
public interface PatientRepository extends JpaRepository<Patient, Long>, QuerydslPredicateExecutor<Patient>, 
										QuerydslBinderCustomizer<QPatient>{
	
	@Override
	public default void customize(QuerydslBindings bindings, QPatient patient) {
		 bindings.bind(patient.firstName, patient.lastName).first((SingleValueBinding<StringPath, String>) (StringPath path, String value) -> {
			 BooleanBuilder predicate = new BooleanBuilder();
			 
			 predicate.or(patient.firstName.containsIgnoreCase(value));
			 predicate.or(patient.lastName.containsIgnoreCase(value));
			 
			 return predicate;	
		 });
	}

	@RestResource(path="name")
	List<Patient> findByFirstNameContainingOrLastNameContainingAllIgnoreCase(String firstName, String lastName, Pageable pageable);
	
}
