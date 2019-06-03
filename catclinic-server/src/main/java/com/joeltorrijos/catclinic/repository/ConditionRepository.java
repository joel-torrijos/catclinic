package com.joeltorrijos.catclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.joeltorrijos.catclinic.model.Condition;

@RepositoryRestResource
public interface ConditionRepository extends JpaRepository<Condition, Long> {

}
