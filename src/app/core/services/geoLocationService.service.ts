import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  protected baseUrl = 'http://localhost:8080/api';

  constructor(
      private api: HttpClient
  ) { }

  public getGeoLocation(address: string) {
    return this.api.post(`${this.baseUrl}/geo`, { address });
  }

}



