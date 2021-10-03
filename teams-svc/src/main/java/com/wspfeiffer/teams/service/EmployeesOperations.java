package com.wspfeiffer.teams.service;

import io.reactivex.Flowable;
import io.reactivex.Single;
import com.wspfeiffer.teams.dto.Employee;

public interface EmployeesOperations {
    Flowable<Employee> findAll();
    Single<Employee> findById(Long id);
}
