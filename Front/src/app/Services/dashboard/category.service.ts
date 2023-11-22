import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icategoryreturn } from 'src/app/Interfaces/category/icategoryreturn';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseURL: string = 'https://localhost:7003/api/Category';
  constructor(private http: HttpClient) {}


   // ---------------- [Get By Id ]
    getById(id:number) : Observable<Icategoryreturn>{
    return this.http.get<Icategoryreturn>(`${this.baseURL}/${id}`);
  }

  // ---------------- [Get All ]
  getAll() : Observable<Icategoryreturn[]>{
    return this.http.get<Icategoryreturn[]>(`${this.baseURL}/All`);
  }


   // ---------------- [Add ]
  add(cat:Icategoryreturn) {
    return this.http.post(this.baseURL,cat);
  }

     // ---------------- [Edit ]
  edit(cat:Icategoryreturn) {
    return this.http.put(this.baseURL,cat);
  }

  // ---------------- [Delete ]
  delete(id:number) {
    return this.http.delete(`${this.baseURL}?id=${id}`);
  }
}
