import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IcontactUs } from 'src/app/Interfaces/icontact-us';

@Injectable({
  providedIn: 'root'
})
export class ContacUsService {
  baseURL: string = 'https://localhost:7003/api/ContactUs';
  constructor(private http: HttpClient) {}

   // ---------------- [Get All ]
    getAll(PageIndex:number) : Observable<IcontactUs[]>{
    return this.http.get<IcontactUs[]>(`${this.baseURL}?pageNumber=${PageIndex}`);
  }

  // ---------------- [ Add Contac Msg ]
      add(msg:IcontactUs) {
      return this.http.post(this.baseURL,msg);
    }

}
