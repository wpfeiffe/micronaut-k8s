import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClrDatagridStateInterface } from "@clr/angular";
import { League } from "../domain/domain";
import { ResourceService } from "../services/resource.service";

@Injectable({
  providedIn: 'root'
})
export class LeagueService extends ResourceService<League> {

  constructor(private http: HttpClient) {
    super(
      http,
      '/api',
      'leagues'
    )
  }
}
