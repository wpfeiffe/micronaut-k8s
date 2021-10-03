package com.wspfeiffer.employees.repository;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import com.wspfeiffer.employees.domain.Employee;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Repository
public abstract class AbstractEmployeeRepository implements CrudRepository<Employee, Long>
{
    private final EntityManager entityManager;

    public AbstractEmployeeRepository(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }

    @Transactional(value = Transactional.TxType.REQUIRED)
    public Employee update(Employee employee) {
        return this.entityManager.merge(employee);
    }
}
