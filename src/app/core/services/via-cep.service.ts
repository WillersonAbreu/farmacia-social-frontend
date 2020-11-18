// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// //import { Address } from '../models/address';
// @Injectable({
//   providedIn: 'root'
// })
// export class ViaCepService {
//   baseUrl = 'https://viacep.com.br/ws/';
//   constructor(
//     private http: HttpClient,
//   ) { }
//   public search(cep: string): Observable<Address> {
//     return this.http.get<Address>(`https://viacep.com.br/ws/${cep}/json/`);
//   }
//   get(cep: string) {
//     return new Observable<Address>((x) => {
//       const request = new XMLHttpRequest();
//       request.open('get', `https://viacep.com.br/ws/${cep}/json/`, true);
//       request.send();
//       request.onload = function() {
//         const data = JSON.parse(this.response);
//         x.next(data);
//       };
//     });
//   }
// }