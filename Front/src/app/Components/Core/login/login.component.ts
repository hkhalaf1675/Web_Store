import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ILogin } from 'src/app/Interfaces/ilogin';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fg !:FormGroup;
  user : ILogin = {
    username : '',
    password : ''
  }

  constructor(private fb:FormBuilder, private login : LoginService, private router:Router){}


  IsFormValid = new BehaviorSubject<boolean>(true);

  ngOnInit(): void {
    this.fg = this.fb.group({
      username:['',[Validators.required, Validators.minLength(4)]],
      password:['',[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/)]]
    })
  }

  OnSubmit(e :Event){
    e.preventDefault();

    if (this.fg.valid)
    {
      this.IsFormValid.next(true);
      this.user.username = this.fg.get('username')?.value;
      this.user.password = this.fg.get('password')?.value;

      this.login.Login(this.user).subscribe(
        {
          next:     () => this.router.navigate(['']),
          error:    (e) => console.log("Incorrect Email or Pass",e),
          complete: () => console.log("Successfully Loged In")
        }
      )
    }
    else
    {
      this.IsFormValid.next(false);
    }
  }

  // ---------------- [ username ]
  get usernameRequired():boolean|void{return this.fg.get('username')?.hasError('required');}
  get usernameValid(): boolean|void { return this.fg.get('username')?.valid;}
  get usernameTouched():boolean|void{ return this.fg.get('username')?.touched;}

  // ---------------- [ password ]
  get passRequired():boolean|void{return this.fg.get('password')?.hasError('required');}
  get passValid(): boolean|void  {return this.fg.get('password')?.valid;}
  get passTouched():boolean|void {return this.fg.get('password')?.touched;}

}
