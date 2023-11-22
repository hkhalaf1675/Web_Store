import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Igeneral } from '../Interfaces/igeneral';
import { Observable } from 'rxjs/internal/Observable';
import { Iuser } from '../Interfaces/user/iuser';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  BaseUrl :string = "https://localhost:7003/api/UserProfile/Update";
  DeleteUrl :string = "https://localhost:7003/api/UserProfile/Delete";

  constructor(private httpclient :HttpClient) { }

  // adding new user
  Edituserdata( user : Igeneral): Observable<Igeneral>{
    return this.httpclient.put<Igeneral>(this.BaseUrl, user )
  }

  Deleteuserdata(password: string): Observable<any> {
    // Assuming you need to send the password as a query parameter
    const params = new HttpParams().set('password', password);

    return this.httpclient.delete(this.DeleteUrl, { params });
  }
}
