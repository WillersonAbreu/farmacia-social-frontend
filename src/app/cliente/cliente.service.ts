import { Injectable } from '@angular/core';
import { BaseService } from '../core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService {
  baseUrl = this.baseUrl + '/clientes';
}
