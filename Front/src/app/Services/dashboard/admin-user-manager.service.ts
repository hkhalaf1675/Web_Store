import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iuser } from 'src/app/Interfaces/user/iuser';

@Injectable({
  providedIn: 'root'
})
export class AdminUserManagerService {
  baseURL: string = 'https://localhost:7003/api/AdminUserManager';
  productCountUrl: string = 'https://localhost:7003/api/Products/GetProductsCount';
  ordersCountUrl: string = 'https://localhost:7003/api/Order/GetOrdersCount';
  totalSellUrl: string = 'https://localhost:7003/api/Order/TotalSell';

  constructor(private http: HttpClient) {}

  // ---------------- [ Get Users Count ]
  GetUsersCount() : Observable<number>{
    return this.http.get<number>(`${this.baseURL}/GetUsersCount`);
  }

  // ---------------- [ Get Products Count ]
  GetProductsCount() : Observable<number>{
    return this.http.get<number>(`${this.productCountUrl}`);
  }

  // ---------------- [ Get Orders Count ]
  GetOrdersCount() : Observable<number>{
    return this.http.get<number>(`${this.ordersCountUrl}`);
  }

  // ---------------- [ Get Total Sell ]
  GetTotalSell() : Observable<number>{
    return this.http.get<number>(`${this.totalSellUrl}`);
  }


   // ---------------- [ Get All Users ]
    GetAllUsers(PageIndex:number) : Observable<Iuser[]>{
    return this.http.get<Iuser[]>(`${this.baseURL}/GetAllUsers/${PageIndex}`);
  }

  // ---------------- [ Delete User ]
  DeleteUser(userName:string) {
    return this.http.delete(`${this.baseURL}/DeleteUser?userName=${userName}`);
  }

}
