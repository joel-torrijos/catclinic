package com.joeltorrijos.catclinic.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.joeltorrijos.catclinic.model.Gender;

@RepositoryRestController
@RequestMapping("/genders")
@CrossOrigin
public class GenderController {
	
	@GetMapping(produces = MediaTypes.HAL_JSON_VALUE)
	public ResponseEntity<Resources<Gender>> getGenders() {
		Resources<Gender> resources = new Resources<>(Gender.orderedValues);
		
		resources.add(linkTo(methodOn(GenderController.class).getGenders()).withSelfRel());
		return ResponseEntity.ok(resources);
	}

}
