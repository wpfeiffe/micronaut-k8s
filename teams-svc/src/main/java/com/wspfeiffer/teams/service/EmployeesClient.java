package com.wspfeiffer.teams.service;

import com.wspfeiffer.teams.dto.Employee;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.client.annotation.Client;
import io.reactivex.rxjava3.core.Flowable;
import io.reactivex.rxjava3.core.Single;

@Client(id = "employees")
public interface EmployeesClient extends EmployeesOperations {
    @Get("/employees")
    Flowable<Employee> finalAll();

    @Get("/employees/{id}")
    Single<Employee> findById(Long id);
}
