package com.joeltorrijos.catclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.joeltorrijos.catclinic.model.Prescription;
import com.joeltorrijos.catclinic.model.PrescriptionId;
import com.joeltorrijos.catclinic.projection.PrescriptionProjection;

@RepositoryRestResource(excerptProjection = PrescriptionProjection.class)
public interface PrescriptionRepository extends JpaRepository<Prescription, PrescriptionId> {
	
}
