import { Injectable } from '@angular/core';
import { BaseService } from '../../core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  baseURL = this.baseURL + "/users";

}
