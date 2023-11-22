import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ireport } from 'src/app/Interfaces/ireport';

@Injectable({
  providedIn: 'root'
})
export class ReporstService {
  baseURL: string = 'https://localhost:7003/api/AdminReport/GetByDate';
  constructor(private http: HttpClient) {}
  

  // ---------------- [ Get All Orders ]
  GetAllOrders(startDate:Date ,endDate : Date ) : Observable<Ireport[]>{
    return this.http.get<Ireport[]>(`${this.baseURL}?startDate=${startDate}&endDate=${endDate}`);
  }
}
