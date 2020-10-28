import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  protected baseUrl = 'http://localhost:8080';  // Essa Url tem que ser reinstanciada

  constructor(
    protected api: HttpClient
  ) { }

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public getAll(): Observable<any> {
    return this.api.get(this.baseUrl);
  }

  public getOne(id): Observable<any> {
    const url = this.baseUrl + '/' + id;
    return this.api.get(url);
  }

  public store(entidade): Observable<any> {
    return this.api.post(this.baseUrl, entidade, this.httpOptions);
  }

  public update(id, entidade): Observable<any> {
    const url = this.baseUrl + '/' + id;
    return this.api.put(url, entidade, this.httpOptions);
  }

  public delete(id): Observable<any> {
    const url = this.baseUrl + '/' + id;
    return this.api.delete(url);
  }

}
