import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ClrSpinner } from "@clr/angular";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Department, Company } from "../../domain/domain";
import { CompanyService } from "../company.service";

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  company: Company;
  id: number;
  isLoaded: boolean;

  saveSuccess: boolean;
  saveError: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    if (this.id > 0) {
      this.companyService.read(this.id).subscribe(result => {
        this.company = result;
        this.isLoaded = true;
      }, error => {
        console.log('Error: ' + error);
      });
    } else {
      this.company = new class implements Company {
        companyName: string = "";
        id: number = 0;
      }
      this.isLoaded = true;
    }
  }

  save() {
    if (this.company.id > 0) {
      this.companyService.update(this.company).subscribe(result => {
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
      this.company.id = null;
      this.companyService.create(this.company).subscribe(result => {
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
