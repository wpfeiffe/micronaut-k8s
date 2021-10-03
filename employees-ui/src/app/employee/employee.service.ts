import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from "../domain/domain";
import { ResourceService } from "../services/resource.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends ResourceService<Employee> {

  constructor(private http: HttpClient) {
    super(
      http,
      '/api',
      'employees'
    )
  }
}
