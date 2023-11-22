import { IRegister } from './../Interfaces/iregister';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IregisterAdmin } from '../Interfaces/user/iregister-admin';
Observable

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  BaseUrl :string = "https://localhost:7003/api/Accounts/Register";
  adminRegisterUrl: string = 'https://localhost:7003/api/AdminUserManager/AddUser';

  constructor(private httpclient :HttpClient) { }

  // adding new user
  Register( user : IRegister): Observable<IRegister>{
    return this.httpclient.post<IRegister>(this.BaseUrl, user )
  }

  // -------------------- [ Admin Add New User ]
  AdminRegister( user : IregisterAdmin): Observable<IregisterAdmin>{
    return this.httpclient.post<IregisterAdmin>(this.adminRegisterUrl, user )
  }
  
}
