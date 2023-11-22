import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegister } from '../Interfaces/iregister';
import { Ipassword } from '../Interfaces/ipassword';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  BaseUrl :string = "https://localhost:7003/api/UserProfile/ChangePassword";

  constructor(private httpclient :HttpClient) { }

  // adding new user
  Editpassword( user : Ipassword): Observable<Ipassword>{
    return this.httpclient.put<Ipassword>(this.BaseUrl, user )
  }
}
