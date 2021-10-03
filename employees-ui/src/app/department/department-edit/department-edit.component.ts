import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ClrSpinner } from "@clr/angular";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Company, Department } from "../../domain/domain";
import { DepartmentService } from "../department.service";
import { CompanyService } from "../../company/company.service";

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent implements OnInit {

  department: Department;
  companies: Company[];
  id: number;
  isLoaded: boolean;
  companyId: string;

  saveSuccess: boolean;
  saveError: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private departmentService: DepartmentService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    if (this.id > 0) {
      this.departmentService.read(this.id).subscribe(result => {
        this.department = result;
        this.companyId = this.department.company.id.toString();
        this.isLoaded = true;
      }, error => {
        console.log('Error: ' + error);
      });
    } else {
      this.department = new class implements Department {
        company: Company;
        deptCode: string = "";
        deptName: string = "";
        id: number = 0;
      };
      this.isLoaded = true;
    }

    this.companyService.list().subscribe(result => {
      this.companies = result;
      this.isLoaded = true;
    }, error => {
      console.log('Error: ' + error);
    });
  }

  save() {
    this.department.company = this.companies.find(({id}) => id === parseInt(this.companyId));

    if (this.department.id > 0) {
      this.departmentService.update(this.department).subscribe(result => {
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
    } else {
      this.departmentService.create(this.department).subscribe(result => {
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
