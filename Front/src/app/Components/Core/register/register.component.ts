import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IRegister } from 'src/app/Interfaces/iregister';
import { LoginService } from 'src/app/Services/login.service';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  fg !: FormGroup
  IsMatchedPass = new BehaviorSubject<boolean>(false)

  user: IRegister = {
    fullName: "",
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: ""
  };


  constructor(private fb: FormBuilder, private register: RegisterService, private router: Router, private login:LoginService) { }


  ngOnInit(): void {
    this.fg = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(4)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required, Validators.pattern(/^([a-zA-Z]{3,})(\s*),(\s*)*([a-zA-Z]{3,})(\s*),(\s*)*([a-zA-Z]{3,})(\s*)$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^0\d{10}$/)]]
    })
  }

  OnSubmit(e: Event) {
    e.preventDefault();

    if (this.fg.valid && this.IsMatched) {
      this.IsMatchedPass.next(false)

      this.user.fullName = this.fg.get('fullname')?.value;
      this.user.userName = this.fg.get('username')?.value;
      this.user.email = this.fg.get('email')?.value;
      this.user.password = this.fg.get('password')?.value;
      this.user.address = this.fg.get('address')?.value;
      this.user.phoneNumber = this.fg.get('phone')?.value;


      this.register.Register(this.user).subscribe(
        {
          next: () => this.router.navigate(['login']),
          error: (e) => console.log('Unabel to Register: ', e)
          ,
          complete: () => {
            console.log("Successfully Registered!")


            // login
            this.login.Login({
              username: this.user.userName,
              password: this.user.password
            }).subscribe({
              next: (d) => console.log('Loggin in...'),
              error: (e) => {
                console.log('Unable to Login: ',e)
                this.router.navigate(['/login'])
              },
              complete: () => {
                console.log('Logged In Successfully!')
                this.router.navigate([''])
              }
            })


          }
        }
      )

    }
    else {
      this.IsMatchedPass.next(true)
    }
  }



  // ---------------- [ fullname ]
  get fullnameRequired(): boolean | void { return this.fg.get('fullname')?.hasError('required'); }
  get fullnameValid(): boolean | void { return this.fg.get('fullname')?.valid; }
  get fullnameTouched(): boolean | void { return this.fg.get('fullname')?.touched; }

  // ---------------- [ username ]
  get usernameRequired(): boolean | void { return this.fg.get('username')?.hasError('required'); }
  get usernameValid(): boolean | void { return this.fg.get('username')?.valid; }
  get usernameTouched(): boolean | void { return this.fg.get('username')?.touched; }

  // ---------------- [ email ]
  get emailRequired(): boolean | void { return this.fg.get('email')?.hasError('required'); }
  get emailValid(): boolean | void { return this.fg.get('email')?.valid; }
  get emailTouched(): boolean | void { return this.fg.get('email')?.touched; }

  // ---------------- [ password ]
  get passRequired(): boolean | void { return this.fg.get('password')?.hasError('required'); }
  get passValid(): boolean | void { return this.fg.get('password')?.valid; }
  get passTouched(): boolean | void { return this.fg.get('password')?.touched; }
  get IsMatched(): boolean | void { return this.fg.get('password')?.value === this.fg.get('confirm')?.value }

  // ---------------- [ confirm ]
  get confirmRequired(): boolean | void { return this.fg.get('confirm')?.hasError('required'); }
  get confirmValid(): boolean | void { return this.fg.get('confirm')?.valid; }
  get confirmTouched(): boolean | void { return this.fg.get('confirm')?.touched; }

  // ---------------- [ address ]
  get addressRequired(): boolean | void { return this.fg.get('address')?.hasError('required'); }
  get addressValid(): boolean | void { return this.fg.get('address')?.valid; }
  get addressTouched(): boolean | void { return this.fg.get('address')?.touched; }

  // ---------------- [ phone ]
  get phoneRequired(): boolean | void { return this.fg.get('phone')?.hasError('required'); }
  get phoneValid(): boolean | void { return this.fg.get('phone')?.valid; }
  get phoneTouched(): boolean | void { return this.fg.get('phone')?.touched; }


}
