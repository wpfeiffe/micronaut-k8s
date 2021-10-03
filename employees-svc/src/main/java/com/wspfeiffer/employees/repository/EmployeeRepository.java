package com.wspfeiffer.employees.repository;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.data.repository.CrudRepository;
import com.wspfeiffer.employees.domain.Employee;

import java.util.List;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long> {
    List<Employee> findByFirstName(String firstName);
    List<Employee> findByActive(Boolean active);
    Page<Employee> list(Pageable pageable);
}
