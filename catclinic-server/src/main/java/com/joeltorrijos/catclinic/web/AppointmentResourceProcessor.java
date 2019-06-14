package com.joeltorrijos.catclinic.web;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.stereotype.Component;

import com.joeltorrijos.catclinic.projection.CustomLinkedAppointmentProjection;

@Component
public class AppointmentResourceProcessor implements ResourceProcessor<Resource<CustomLinkedAppointmentProjection>> {
	
	private final AppointmentLinks appointmentLinks;
	
	public AppointmentResourceProcessor(AppointmentLinks appointmentLinks) {
		this.appointmentLinks = appointmentLinks;
	}
	
	@Override
	public Resource<CustomLinkedAppointmentProjection> process(Resource<CustomLinkedAppointmentProjection> resource) {

		if(resource.getContent().isPending()) {
			resource.add(appointmentLinks.getDiagnoseLink(resource));			
		} else if (resource.getContent().isForPayment()) {
			resource.add(appointmentLinks.getPaymentLink(resource));		
		}
		
		if(resource.getContent().isCancellable()) {
			resource.add(appointmentLinks.getCancelLink(resource));	
		}
		
		return resource;
	}
}
