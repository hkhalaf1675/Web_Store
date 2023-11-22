import { ClaimsService } from './claims.service';
import { Injectable } from '@angular/core';
import { ILogin } from '../Interfaces/ilogin';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Itoken } from '../Interfaces/itoken';
import { CurrentuserService } from './currentuser.service';
import { CartService } from './cart.service';
import { FavoriteService } from './favorite.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  IsLoggedIn = new BehaviorSubject<boolean>(false)
  IsAdmin = new BehaviorSubject<boolean>(false)
  CurrentUserName = new BehaviorSubject<string>('')

  BaseUrl: string = "https://localhost:7003/api/Accounts/Login"

  constructor(private httpclien: HttpClient, private claim: ClaimsService, private data: CurrentuserService, private cartservice: CartService, private favoriteservice: FavoriteService) { }

  Login(user: ILogin): Observable<Itoken> {
    return this.httpclien.post<Itoken>(this.BaseUrl, user).pipe(tap((res: any) => {
      if (res) {
        localStorage.setItem('token', res.token);

        // Get Name of the User from Token Claims and display it in NavBar
        let claims = JSON.parse(window.atob(res.token.split('.')[1]));

        this.CurrentUserName.next(claims[this.claim.claimTypes.GivenName]);

        // check for the admin if logged in or not!
        if (Array.isArray(claims[this.claim.claimTypes.Role]) && claims[this.claim.claimTypes.Role].includes('Admin')) {
          this.IsAdmin.next(true);
        } else if (claims[this.claim.claimTypes.Role] === 'Admin') {
          this.IsAdmin.next(true);
        } else {
          this.IsAdmin.next(false);
        }

      }

      if (localStorage.getItem('token')) {

        this.IsLoggedIn.next(true)

        this.cartservice.GetCart().subscribe();

        this.favoriteservice.GetFavorite().subscribe();
      }
    }))
  }

}
