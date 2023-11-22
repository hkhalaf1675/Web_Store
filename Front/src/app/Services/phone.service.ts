import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iphones } from '../Interfaces/iphones';
import { StreamInvocationMessage } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  BaseUrl :string = 'https://localhost:7003/api/UserProfile/get-phones';
  AddPhoneUrl : string = 'https://localhost:7003/api/UserProfile/add-phone';
  DeletePhoneUrl : string = 'https://localhost:7003/api/UserProfile/delete-phone'

  constructor(private httpclient:HttpClient) { }

  GetAllPhones() : Observable<Iphones[]> {
   return this.httpclient.get<Iphones[]>(this.BaseUrl);
  }

  AddNewPhone(phone: FormData): Observable<any> {
    return this.httpclient.post<string>(this.AddPhoneUrl, phone );
  }

  DeletePhone (phone:string) : Observable<void> {
    let params = new HttpParams();
    params = params.set('phone', phone)
    return this.httpclient.delete<void>(this.DeletePhoneUrl, {params})
  }


}
