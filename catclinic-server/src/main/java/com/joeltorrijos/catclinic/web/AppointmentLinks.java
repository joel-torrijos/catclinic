package com.joeltorrijos.catclinic.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.LinkBuilder;
import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Component;

import com.joeltorrijos.catclinic.model.Appointment;
import com.joeltorrijos.catclinic.projection.CustomLinkedAppointmentProjection;

@Component
public class AppointmentLinks {
	
	static final String DIAGNOSE = "diagnose";
	static final String PAY = "pay";
	static final String CANCEL = "cancel";
	
	@Autowired
	private RepositoryRestMvcConfiguration configuration;


	public Link getDiagnoseLink(Resource<CustomLinkedAppointmentProjection> resource) {
		LinkBuilder link = configuration.entityLinks().linkForSingleResource(Appointment.class,
				resource.getContent().getId());
		return link.slash(DIAGNOSE).withRel(DIAGNOSE);
	}
	
	public Link getPaymentLink(Resource<CustomLinkedAppointmentProjection> resource) {
		LinkBuilder link = configuration.entityLinks().linkForSingleResource(Appointment.class,
				resource.getContent().getId());
		return link.slash(PAY).withRel(PAY);
	}
	
	public Link getCancelLink(Resource<CustomLinkedAppointmentProjection> resource) {
		LinkBuilder link = configuration.entityLinks().linkForSingleResource(Appointment.class,
				resource.getContent().getId());
		return link.slash(CANCEL).withRel(CANCEL);
	}

}
