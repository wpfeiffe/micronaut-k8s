package com.wspfeiffer.employees.repository;

import com.wspfeiffer.employees.domain.Company;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.data.repository.CrudRepository;
import com.wspfeiffer.employees.domain.Department;


import java.util.List;

@Repository
public interface DepartmentRepository extends CrudRepository<Department, Long> {
    List<Department> findByDeptCode(String deptCode);
    Page<Department> list(Pageable pageable);
}
