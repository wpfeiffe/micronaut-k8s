import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Department, Employee } from "../../domain/domain";
import { EmployeeService } from "../employee.service";
import { DepartmentService } from "../../department/department.service";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employee: Employee;
  departments: Department[];
  id: number;
  isLoaded: boolean;
  departmentId: string;

  saveSuccess: boolean;
  saveError: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    if (this.id > 0) {
      this.employeeService.read(this.id).subscribe(result => {
        this.employee = result;
        this.departmentId = this.employee.department.id.toString();
        this.isLoaded = true;
      }, error => {
        console.log('Error: ' + error);
      });
    } else {
      this.employee = new class implements Employee {
        active: boolean = true;
        department: Department;
        firstName: string = "";
        id: number = 0;
        lastName: string = "";
        startDate: string = "";
        title: string = "";
      };
      this.isLoaded = true;
    }

    this.departmentService.list().subscribe(result => {
      this.departments = result;
      this.isLoaded = true;
    }, error => {
      console.log('Error: ' + error);
    });
  }

  save() {
    this.employee.department = this.departments.find(dept => dept.id === parseInt(this.departmentId));

    if (this.employee.id > 0) {
      this.employeeService.update(this.employee).subscribe(result => {
        // success
        this.employee = result;
        this.saveSuccess = true;
        setTimeout(() => {
          this.saveSuccess = false;
        }, 3000);
      }, error => {
        // not success
        this.saveError = true;
        setTimeout(() => {
          this.saveError = false;
        }, 3000);
      });
    } else {
      this.employee.id = null;  // set to null for insert
      this.employeeService.create(this.employee).subscribe(result => {
        // success
        this.saveSuccess = true;
        setTimeout(() => {
          this.saveSuccess = false;
        }, 3000);
      }, error => {
        // not success
        this.saveError = true;
        setTimeout(() => {
          this.saveError = false;
        }, 3000);
      });
    }
  }

}
