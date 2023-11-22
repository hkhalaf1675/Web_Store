import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegister } from '../Interfaces/iregister';
import { Iaddress } from '../Interfaces/iaddress';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  BaseUrl: string = "https://localhost:7003/api/UserProfile/Address";

  constructor(private httpclient: HttpClient) { }

  GetAddresses(): Observable<any> {
    return this.httpclient.get<any>(this.BaseUrl + "es");
  }

  // adding new Address
  AddAddress(address: Iaddress): Observable<Iaddress> {
    return this.httpclient.post<Iaddress>(this.BaseUrl, address)
  }

  // Delete Address
  DeleteAddress(id: number): Observable<void> {

    let params = new HttpParams();
    params = params.set('addressId', id);

    return this.httpclient.delete<void>(this.BaseUrl, { params } );
  }
}
