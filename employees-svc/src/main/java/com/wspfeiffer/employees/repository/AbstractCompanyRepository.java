package com.wspfeiffer.employees.repository;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import com.wspfeiffer.employees.domain.Company;

import javax.persistence.EntityManager;

@Repository
public abstract class AbstractCompanyRepository implements CrudRepository<Company, Long>
{
    private final EntityManager entityManager;

    public AbstractCompanyRepository(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }

}
