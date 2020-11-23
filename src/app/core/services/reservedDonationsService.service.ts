import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ReservedDonationsServiceService extends BaseService {

  baseURL = this.baseURL + "/orders";

  public findAllById(id): Observable<any> {
    return this.api.get(`${this.baseURL}/user/${id}`, this.httpOptions);
  }

}
