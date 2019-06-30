package com.joeltorrijos.catclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.joeltorrijos.catclinic.model.Medicine;
import com.joeltorrijos.catclinic.model.QMedicine;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;

@RepositoryRestResource
public interface MedicineRepository extends JpaRepository<Medicine, Long>, QuerydslPredicateExecutor<Medicine>, 
										QuerydslBinderCustomizer<QMedicine> {
	
	@Override
	default void customize(QuerydslBindings bindings, QMedicine medicine) {
		bindings.bind(String.class).first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
	}

}
