package com.wspfeiffer.employees.controller;

import com.sun.istack.Nullable;
import com.wspfeiffer.employees.domain.Employee;
import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.http.HttpHeaders;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import com.wspfeiffer.employees.domain.Department;
import com.wspfeiffer.employees.repository.DepartmentRepository;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Controller("/api/departments")
public class DepartmentController
{
    private final DepartmentRepository departmentRepository;

    public DepartmentController(DepartmentRepository departmentRepository)
    {
        this.departmentRepository = departmentRepository;
    }

    @Get("/")
    public List<Department> all() {
        return (ArrayList<Department>) departmentRepository.findAll();
    }

    @Get("/pageable{?pageable*}")
    public HttpResponse<Page<Department>> getByPage(Pageable pageable) {
        return HttpResponse.ok(departmentRepository.list(pageable));
    }

    @Get("/{id}")
    public HttpResponse<Department> getById(Long id) {
        Department found = departmentRepository.findById(id).orElse(null);
        if (found == null) {
            return HttpResponse.notFound();
        }
        return HttpResponse.ok(found);
    }

    @Get("/findBy{?deptCode}")
    public HttpResponse<List<Department>> getFindBy(@QueryValue @Nullable String deptCode) {
        if (deptCode == null) {
            return HttpResponse.badRequest();
        }
        else {
            return HttpResponse.ok(departmentRepository.findByDeptCode(deptCode));
        }
    }



    @Put("/{id}")
    @Transactional(value = Transactional.TxType.REQUIRED)
    public HttpResponse<Department> update(Long id, @Body @Valid Department department) {
         if (department.getId() == null || !department.getId().equals(id)) {
            return HttpResponse.badRequest();
        }
        Department updated = departmentRepository.findById(id).orElse(null);
        if (updated == null) {
            return HttpResponse.notFound();
        }
        updated.setDeptCode(department.getDeptCode());
        updated.setDeptName(department.getDeptName());
        updated = departmentRepository.save(updated);
        return HttpResponse.ok(updated);
    }

    @Post("/")
    public HttpResponse<Department> create(@Body @Valid Department department) {
        assert department.getId() == null;
        final Department updated = departmentRepository.save(department);
        return HttpResponse.ok(updated);
    }

    @Delete("/{id}")
    @Transactional(value = Transactional.TxType.REQUIRED)
    public HttpResponse<Department> delete(Long id) {
        Department found = departmentRepository.findById(id).orElse(null);
        if (found == null) {
            return HttpResponse.notFound();
        }
        departmentRepository.delete(found);
        return HttpResponse.ok(found);
    }

    private URI toUri(Department department) {
        return URI.create("/department/" + department.getId());
    }
}
