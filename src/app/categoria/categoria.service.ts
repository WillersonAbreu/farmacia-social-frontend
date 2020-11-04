import { Injectable } from '@angular/core';
import { BaseService } from '../core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService {
  baseUrl = this.baseUrl + '/categorias';

}
