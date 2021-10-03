import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClrDatagridStateInterface } from "@clr/angular";
import { Player } from "../domain/domain";
import { ResourceService } from "../services/resource.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends ResourceService<Player> {

  constructor(private http: HttpClient) {
    super(
      http,
      '/api',
      'players'
    )
  }
}
