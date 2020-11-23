import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class DonationsService extends BaseService {

  baseURL = this.baseURL + "/donations";

  getPagableAndSorting(pageNumber: number, pageSize: number, filter: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', pageNumber.toString());
    params = params.append('size', pageSize.toString());
    params = params.append('statusId', "1");
    params = params.append('isActive', "1");
    params = params.append('title', filter);
    // params = params.append('description', filter);

    return this.api.get(`${this.baseURL}/pageable`, { params });
  }

  public findAllById(id): Observable<any> {
    return this.api.get(`${this.baseURL}/user/${id}`, this.httpOptions);
  }


}
