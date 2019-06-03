package com.joeltorrijos.catclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.joeltorrijos.catclinic.model.Appointment;

@RepositoryRestResource
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

}
