import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimsService } from 'src/app/Services/claims.service';
import { CurrentuserService } from 'src/app/Services/currentuser.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public data : CurrentuserService, private claim : ClaimsService, private router:Router ,public log: LoginService){}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token) {

      // we get the name of the logged in user from the token claims in case it stored in the browser
      let claims = JSON.parse(window.atob(token.split('.')[1]));
      this.log.CurrentUserName.next(claims[this.claim.claimTypes.GivenName])
  }
  }

logout(){
  console.log('Logout clicked');
  localStorage.removeItem('token');
  this.router.navigate(['login'])

}

}
