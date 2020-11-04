import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class DonationsService extends BaseService {

  baseURL = this.baseURL + "/donations";

}
