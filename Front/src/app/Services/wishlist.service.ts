import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Iwishlist } from '../Interfaces/iwishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  BaseUrl: string = "https://localhost:7003/api/UserProfile/wishlist"
  wishlistLength: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private httpclient: HttpClient) { }

  // get all (GET)
  GetWishlist(): Observable<Iwishlist[]> {
    return this.httpclient.get<Iwishlist[]>(this.BaseUrl).pipe(tap((res: any) => {
      this.wishlistLength.next(res.length);
    }));
  }

  // add wishlist (POST)
  AddToWishlist(id: number): Observable<any> {
    return this.httpclient.post<any>(`${this.BaseUrl}/${id}`, {}).pipe(tap((res: any) => {
      this.wishlistLength.next(this.wishlistLength.value + 1);
    }));
  }

  // delete wishlist (DELETE)
  DeleteWishlist(id: number): Observable<any> {
    return this.httpclient.delete<any>(`${this.BaseUrl}/${id}`).pipe(tap((res: any) => {
      this.wishlistLength.next(this.wishlistLength.value - 1);
    }));
  }

}
