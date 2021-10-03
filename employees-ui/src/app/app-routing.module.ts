import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from "./employee/employee-list/employee-list.component";
import { DepartmentListComponent } from "./department/department-list/department-list.component";
import { CompanyListComponent } from "./company/company-list/company-list.component";
import {EmployeeEditComponent} from "./employee/employee-edit/employee-edit.component";
import {DepartmentEditComponent} from "./department/department-edit/department-edit.component";
import {CompanyEditComponent} from "./company/company-edit/company-edit.component";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'employees'},
  { path: 'employees', component: EmployeeListComponent},
  { path: 'employees/:id', component: EmployeeEditComponent},
  { path: 'departments', component: DepartmentListComponent},
  { path: 'departments/:id', component: DepartmentEditComponent},
  { path: 'companies', component: CompanyListComponent},
  { path: 'companies/:id', component: CompanyEditComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
