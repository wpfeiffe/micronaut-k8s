package com.wspfeiffer.employees.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wspfeiffer.employees.domain.Company;
import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.http.HttpHeaders;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import com.wspfeiffer.employees.domain.Employee;
import com.wspfeiffer.employees.repository.AbstractEmployeeRepository;
import com.wspfeiffer.employees.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller("/api/employees")
public class EmployeeController
{
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final Logger LOG = LoggerFactory.getLogger(EmployeeController.class);

    private final EmployeeRepository employeeRepository;
    private final AbstractEmployeeRepository abstractEmployeeRepository;

    public EmployeeController(AbstractEmployeeRepository abstractEmployeeRepository, EmployeeRepository employeeRepository)
    {
        this.abstractEmployeeRepository = abstractEmployeeRepository;
        this.employeeRepository = employeeRepository;
    }

    @Get("/")
    public List<Employee> all() {
        return (ArrayList<Employee>) employeeRepository.findAll();
    }

    @Get("/pageable{?pageable*}")
    public HttpResponse<Page<Employee>> getByPage(Pageable pageable) {
        return HttpResponse.ok(employeeRepository.list(pageable));
    }

    @Get("/{id}")
    public HttpResponse<Employee> getById(Long id) {
        Employee found = employeeRepository.findById(id).orElse(null);
        if (found == null)
        {
            return HttpResponse.notFound();
        }
        return HttpResponse.ok(found);
    }

    @Get("/findBy{?firstName,active}")
    public HttpResponse<List<Employee>> getFindBy(@QueryValue Optional<String> firstName, @QueryValue Optional<Boolean> active) {
        if ((firstName.isEmpty() && active.isEmpty()) || (firstName.isPresent() && active.isPresent())) {
            return HttpResponse.badRequest();
        }
        else if (firstName.isPresent()) {
           List<Employee> employees = employeeRepository.findByFirstName(firstName.get());
            if (employees == null) {
                return HttpResponse.notFound();
            }
            return HttpResponse.ok(employees);
        }
        else {
            List<Employee> employees = employeeRepository.findByActive(active.get());
            if (employees == null) {
                return HttpResponse.notFound();
            }
            return HttpResponse.ok(employees);
        }
    }

    @Put("/{id}")
    @Transactional(value = Transactional.TxType.REQUIRED)
    public HttpResponse<Employee> update(Long id, @Body @Valid Employee employee) {
        if (employee.getId() == null || !employee.getId().equals(id)) {
            return HttpResponse.badRequest();
        }
        Employee updated = employeeRepository.findById(id).orElse(null);
        if (updated == null) {
            return HttpResponse.notFound();
        }
        updated.setTitle(employee.getTitle());
        updated.setFirstName(employee.getFirstName());
        updated.setLastName(employee.getLastName());
        updated.setStartDate(employee.getStartDate());
        updated.setActive(employee.isActive());
        updated = employeeRepository.save(updated);
        return HttpResponse.ok(updated);
    }

    @Post("/")
    public HttpResponse<Employee> create(@Body @Valid Employee employee) {
        assert employee.getId() == null;
        final Employee updated = employeeRepository.save(employee);
        return HttpResponse.ok(updated);

    }

    @Delete("/{id}")
    @Transactional(value = Transactional.TxType.REQUIRED)
    public HttpResponse<Employee> delete(Long id) {
        Employee found = employeeRepository.findById(id).orElse(null);
        if (found == null) {
            return HttpResponse.notFound();
        }
        employeeRepository.delete(found);
        return HttpResponse.ok(found);
    }

    private URI toUri(Employee employee) {
        return URI.create("/employee/" + employee.getId());
    }
}
