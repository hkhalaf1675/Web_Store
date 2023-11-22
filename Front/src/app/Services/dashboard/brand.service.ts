import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ibrandadd } from 'src/app/Interfaces/brand/ibrandadd';
import { Ibrandreturn } from 'src/app/Interfaces/brand/ibrandreturn';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  baseURL: string = 'https://localhost:7003/api/Brand';
  constructor(private http: HttpClient) {}


  // ---------------- [Get By Id ]
  getById(id:number) : Observable<Ibrandreturn>{
    return this.http.get<Ibrandreturn>(`${this.baseURL}/${id}`);
  }

   // ---------------- [Get All ]
  getAll() : Observable<Ibrandreturn[]>{
    return this.http.get<Ibrandreturn[]>(`${this.baseURL}/All`);
  }

     // ---------------- [Add ]
  add(brand:Ibrandadd) {
    return this.http.post(this.baseURL,brand);
  }

     // ---------------- [Edit ]
  edit(brand:Ibrandreturn) {
    return this.http.put(this.baseURL,brand);
  }

  // ---------------- [Delete ]
  delete(id:number) {
    return this.http.delete(`${this.baseURL}?id=${id}`);
  }
}
