import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from "../domain/domain";
import { ResourceService } from "../services/resource.service";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends ResourceService<Department> {

  constructor(private http: HttpClient) {
    super(
      http,
      '/api',
      'departments'
    )
  }
}
