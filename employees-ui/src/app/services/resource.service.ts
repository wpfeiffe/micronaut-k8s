import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ClrDatagridStateInterface} from "@clr/angular";
import { environment } from '../../environments/environment';

export class ResourceService<T extends Resource> {
  constructor(
    private httpClient: HttpClient,
    private url: string,
    private endpoint: string) {
    this.url = environment.baseUrl + this.url;
  }

  public create(item: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.url}/${this.endpoint}/`, item);
  }

  public update(item: T): Observable<T> {
    return this.httpClient
      .put<T>(`${this.url}/${this.endpoint}/${item.id}`, item);
  }

  read(id: number): Observable<T> {
    return this.httpClient
      .get<T>(`${this.url}/${this.endpoint}/${id}`);
  }

  listForGrid(datagridState: ClrDatagridStateInterface): Observable<any> {
    let sort = "";
    if (datagridState.sort) {
      sort = `&sort=${datagridState.sort.by},${datagridState.sort.reverse ? "desc" : "asc"}`;
    }
    let urlWithArgs = `${this.url}/${this.endpoint}/pageable?page=${datagridState.page.from / datagridState.page.size}&size=${datagridState.page.size}${sort}`;
    return this.httpClient
      .get<any>(urlWithArgs);
  }

  list(): Observable<T[]> {
    let urlWithArgs = `${this.url}/${this.endpoint}`;
    return this.httpClient
      .get<any>(urlWithArgs);
  }

  delete(id: number) {
    return this.httpClient
      .delete(`${this.url}/${this.endpoint}/${id}`);
  }
}

export class Resource {
  id: number;
}
