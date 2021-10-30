package com.wspfeiffer.teams;

import io.micronaut.runtime.Micronaut;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;

@OpenAPIDefinition(
        info = @Info(
                title = "Teams Service",
                version = "0.0.2",
                description = "Teams API",
                license = @License(name = "Apache 2.0", url = "https://teams-app.wspfeiffer.com"),
                contact = @Contact(url = "https://teams-app.wspfeiffer.com", name = "admin", email = "admin@wspfeiffer.com")
        )
)
public class TeamsApplication {

    public static void main(String[] args) {
        Micronaut.run(TeamsApplication.class, args);
    }
}
