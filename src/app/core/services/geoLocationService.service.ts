import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RESOURCES_API_URL } from '../config/global';


@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  protected baseUrl = RESOURCES_API_URL;

  constructor(
      private api: HttpClient
  ) { }

  public getGeoLocation(address: string) {
    return this.api.post(`${this.baseUrl}/geo`, { address });
  }

}



