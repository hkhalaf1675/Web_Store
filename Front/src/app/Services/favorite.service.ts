import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Ifavorite } from '../Interfaces/ifavorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  BaseUrl: string = "https://localhost:7003/api/UserProfile/favourite"
  constructor(private httpclient: HttpClient) { }

  favoriteLength: BehaviorSubject<number> = new BehaviorSubject(0);

  // get all (GET)
  GetFavorite(): Observable<Ifavorite[]> {
    return this.httpclient.get<Ifavorite[]>(this.BaseUrl).pipe(tap((res: any) => {
      this.favoriteLength.next(res.length);
    }));
  }

  // Add Favorite (POST)
  AddToFavorite(id: number): Observable<any> {
    return this.httpclient.post<any>(`${this.BaseUrl}/${id}`, {}).pipe(tap((res: any) => {
      this.favoriteLength.next(this.favoriteLength.value + 1);
    }));
  }

  // Delete Favorite (Delete)
  DeleteFavorite(id: number): Observable<any> {
    return this.httpclient.delete<any>(`${this.BaseUrl}/${id}`).pipe(tap((res: any) => {
      this.favoriteLength.next(this.favoriteLength.value - 1);
    }));
  }

}



