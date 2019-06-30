package com.joeltorrijos.catclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.joeltorrijos.catclinic.model.Procedure;
import com.joeltorrijos.catclinic.model.QProcedure;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;

@RepositoryRestResource
public interface ProcedureRepository extends JpaRepository<Procedure, Long>, QuerydslPredicateExecutor<Procedure>, 
										QuerydslBinderCustomizer<QProcedure> {
	
	@Override
	default void customize(QuerydslBindings bindings, QProcedure procedure) {
		bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
	}

}
