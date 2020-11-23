import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//necessário pra comunicar com o backend
export abstract class BaseService {

  protected baseURL = "http://localhost:8080/api";

  constructor(
    protected api: HttpClient
  ) { }

  //configurações de cabeçalho para envio do Body
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  //observable obsersar se voltou com algum valor ou nao e nao ficar checando nulos com ifs
  public getAll(): Observable<any> {
    return this.api.get(this.baseURL);
  }

  public getOne(id): Observable<any> {
    const url = this.baseURL + "/" + id;
    return this.api.get(url);
  }

  public store(entidade): Observable<any> {
    return this.api.post(this.baseURL, entidade, this.httpOptions);
  }

  public update(id, entidade): Observable<any> {
    const url = this.baseURL + '/' + id;
    return this.api.put(url, entidade, this.httpOptions);
  }

  public delete(id): Observable<any> {
    const url = this.baseURL + '/' + id;
    return this.api.delete(url, this.httpOptions);
  }


}
