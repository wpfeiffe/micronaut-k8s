package com.wspfeiffer.teams.service;

import com.wspfeiffer.teams.dto.Employee;
import io.reactivex.rxjava3.core.Flowable;
import io.reactivex.rxjava3.core.Single;

public interface EmployeesOperations {
    Flowable<Employee> findAll();
    Single<Employee> findById(Long id);
}
