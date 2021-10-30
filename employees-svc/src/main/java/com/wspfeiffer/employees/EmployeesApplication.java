package com.wspfeiffer.employees;

import io.micronaut.runtime.Micronaut;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;

@OpenAPIDefinition(
        info = @Info(
                title = "Employees Service",
                version = "0.0.2",
                description = "Employees API",
                license = @License(name = "Apache 2.0", url = "https://employees-app.wspfeiffer.com"),
                contact = @Contact(url = "https://employees-app.wspfeiffer.com", name = "admin", email = "admin@wspfeiffer.com")
        )
)
public class EmployeesApplication {

    public static void main(String[] args) {
        Micronaut.run(EmployeesApplication.class, args);
    }
}
