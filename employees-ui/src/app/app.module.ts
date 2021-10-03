import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule, ClrModalModule} from '@clr/angular';
import { ClrSpinnerModule, ClrIconModule, ClrDatagridModule } from "@clr/angular";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { DepartmentListComponent } from "./department/department-list/department-list.component";
import { CompanyListComponent } from "./company/company-list/company-list.component";
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { DepartmentEditComponent } from "./department/department-edit/department-edit.component";
import { CompanyEditComponent } from "./company/company-edit/company-edit.component";
import { SecurityInterceptor } from "./interceptors/security.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    DepartmentListComponent,
    CompanyListComponent,
    EmployeeEditComponent,
    DepartmentEditComponent,
    CompanyEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    ClrSpinnerModule,
    ClrModalModule,
    ClrIconModule,
    ClrDatagridModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
