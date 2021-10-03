package com.wspfeiffer.teams.service;

import io.micronaut.http.annotation.Get;
import io.micronaut.http.client.annotation.Client;
import io.reactivex.Flowable;
import io.reactivex.Single;
import com.wspfeiffer.teams.dto.Employee;

@Client(id = "employees")
public interface EmployeesClient extends EmployeesOperations {
    @Get("/employees")
    Flowable<Employee> finalAll();

    @Get("/employees/{id}")
    Single<Employee> findById(Long id);
}
