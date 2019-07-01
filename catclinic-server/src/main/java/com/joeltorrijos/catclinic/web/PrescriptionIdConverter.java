package com.joeltorrijos.catclinic.web;

import java.io.Serializable;

import org.springframework.data.rest.webmvc.spi.BackendIdConverter;
import org.springframework.stereotype.Component;

import com.joeltorrijos.catclinic.model.Prescription;
import com.joeltorrijos.catclinic.model.PrescriptionId;

@Component
public class PrescriptionIdConverter implements BackendIdConverter {

	  /*
	   * @see org.springframework.plugin.core.Plugin#supports(java.lang.Object)
	   */
	  @Override
	  public boolean supports(Class<?> delimiter) {
	      return Prescription.class.isAssignableFrom(delimiter);
	  }

	  /*
	   * @see org.springframework.data.rest.webmvc.spi.BackendIdConverter#fromRequestId(java.lang.String, java.lang.Class)
	   */
	  @Override
	  public Serializable fromRequestId(String id, Class<?> entityType) {
	    String[] parts = id.split("_", 2);
	    
	    if (parts != null && parts.length == 2) {
	        return new PrescriptionId(Long.parseLong(parts[0]), Long.parseLong(parts[1]));
	    } else {
	        throw new IllegalArgumentException("Id must consist of two longs separated by '_'!");
	    }
	  }

	  /*
	   * @see org.springframework.data.rest.webmvc.spi.BackendIdConverter#toRequestId(java.io.Serializable, java.lang.Class)
	   */
	  @Override
	  public String toRequestId(Serializable id, Class<?> entityType) {
		  PrescriptionId pId = (PrescriptionId) id;
	      return String.valueOf(pId.getMedicineId()) + "_" + String.valueOf(pId.getAppointmentId());
	  }

}