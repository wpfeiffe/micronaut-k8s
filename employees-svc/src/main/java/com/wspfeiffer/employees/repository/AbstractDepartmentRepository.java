package com.wspfeiffer.employees.repository;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import com.wspfeiffer.employees.domain.Department;

import javax.persistence.EntityManager;

@Repository
public abstract class AbstractDepartmentRepository implements CrudRepository<Department, Long>
{
    private final EntityManager entityManager;

    public AbstractDepartmentRepository(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }
}
