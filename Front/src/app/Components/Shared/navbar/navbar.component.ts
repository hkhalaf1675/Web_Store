import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClaimsService } from 'src/app/Services/claims.service';
import { CurrentuserService } from 'src/app/Services/currentuser.service';
import { LoginService } from 'src/app/Services/login.service';
import { CartService } from 'src/app/Services/cart.service';
import { FavoriteService } from 'src/app/Services/favorite.service';
import { WishlistService } from 'src/app/Services/wishlist.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public log: LoginService, public data: CurrentuserService, private claim: ClaimsService, private router: Router, public cartservice: CartService, public favoriteservice: FavoriteService, private wishlistservice: WishlistService) { }


  logout() {
    localStorage.removeItem('token');
    this.log.IsLoggedIn.next(false);
    this.router.navigate(['login']);

    this.cartservice.CartLength.next(0);
    this.favoriteservice.favoriteLength.next(0);
    this.wishlistservice.wishlistLength.next(0);

  }

  ngOnInit(): void {
    let token = localStorage.getItem('token');



    if (token) {

      // in case there is a token then the login button will disappear
      this.log.IsLoggedIn.next(true);

      // in case the user is logged in load it's data
      this.cartservice.GetCart().subscribe();
      this.favoriteservice.GetFavorite().subscribe();
      this.wishlistservice.GetWishlist().subscribe();

      // we get the name of the logged in user from the token claims in case it stored in the browser
      let claims = JSON.parse(window.atob(token.split('.')[1]));
      this.log.CurrentUserName.next(claims[this.claim.claimTypes.GivenName])

      // check if the admin logged in
      if (Array.isArray(claims[this.claim.claimTypes.Role]) && claims[this.claim.claimTypes.Role].includes('Admin')) {
        this.log.IsAdmin.next(true);
      } else if (claims[this.claim.claimTypes.Role] === 'Admin') {
        this.log.IsAdmin.next(true);
      } else {
        this.log.IsAdmin.next(false);
      }

    }
    else
      this.log.IsLoggedIn.next(false);
  }


  // used in the cart and favorite buttons to check if logged in before open it's data
  // in case you're not logged in it will navigate you to the loge in page
  CheckLog(s: string) {
    if (this.log.IsLoggedIn.value) {
      this.router.navigate([s])
    }
    else {
      this.router.navigate(['login'])
    }
  }

}
