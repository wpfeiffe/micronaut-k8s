import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClrDatagridStateInterface} from "@clr/angular";
import {Team} from "../domain/domain";
import {ResourceService} from "../services/resource.service";

@Injectable({
  providedIn: 'root'
})
export class TeamService extends ResourceService<Team> {

  constructor(private http: HttpClient) {
    super(
      http,
      '/api',
      'teams'
    )
  }
}
