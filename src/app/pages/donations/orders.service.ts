import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseService {

  baseURL = this.baseURL + "/orders";

}
