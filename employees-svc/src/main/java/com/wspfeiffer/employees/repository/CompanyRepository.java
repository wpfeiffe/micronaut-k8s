package com.wspfeiffer.employees.repository;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.data.repository.CrudRepository;
import com.wspfeiffer.employees.domain.Company;



@Repository
public interface CompanyRepository extends CrudRepository<Company, Long> {
    Page<Company> list(Pageable pageable);
}
