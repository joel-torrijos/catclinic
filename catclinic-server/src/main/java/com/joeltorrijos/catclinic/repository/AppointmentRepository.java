package com.joeltorrijos.catclinic.repository;

import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.joeltorrijos.catclinic.model.Appointment;
import com.joeltorrijos.catclinic.model.QAppointment;
import com.joeltorrijos.catclinic.projection.AppointmentProjection;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.DateTimePath;
import com.querydsl.core.types.dsl.StringPath;

@RepositoryRestResource(excerptProjection = AppointmentProjection.class)
//@RepositoryRestResource
public interface AppointmentRepository extends JpaRepository<Appointment, Long>, QuerydslPredicateExecutor<Appointment>, 
											QuerydslBinderCustomizer<QAppointment> {

	@Override
	default void customize(QuerydslBindings bindings, QAppointment appointment) {
		bindings.bind(LocalDateTime.class).first((SingleValueBinding<DateTimePath<LocalDateTime>, LocalDateTime>) (DateTimePath<LocalDateTime> path, LocalDateTime value) -> {
			LocalDateTime startOfDay = value.with(LocalTime.MIN);
			LocalDateTime endOfDay = value.with(LocalTime.MAX);
			return path.between(startOfDay, endOfDay);
		 });
		
		bindings.bind(appointment.patient.firstName, appointment.patient.lastName).first((SingleValueBinding<StringPath, String>) (StringPath path, String value) -> {
			BooleanBuilder predicate = new BooleanBuilder();
			 
			predicate.or(appointment.patient.firstName.containsIgnoreCase(value));
			predicate.or(appointment.patient.lastName.containsIgnoreCase(value));
			
			String[] names = value.split(" ");
			if(names.length < 2) {
				return predicate;					
			} else {
				predicate.or(appointment.patient.firstName.containsIgnoreCase(names[0])
								.and(appointment.patient.lastName.containsIgnoreCase(names[1])));
				return predicate;
			}
	 
		});
	}
}
