import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from "../domain/domain";
import { ResourceService } from "../services/resource.service";

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends ResourceService<Company> {

  constructor(private http: HttpClient) {
    super(
      http,
      '/api',
      'companies'
    )
  }
}
