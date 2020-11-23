import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DonationStatusService extends BaseService {
  baseURL = this.baseURL + "/donation-status";
}
