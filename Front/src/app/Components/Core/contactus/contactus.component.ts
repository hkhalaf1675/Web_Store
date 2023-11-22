// we have to provide the feature of showing the location of the the store
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IcontactUs } from 'src/app/Interfaces/icontact-us';
import { IRegister } from 'src/app/Interfaces/iregister';
import { ContacUsService } from 'src/app/Services/dashboard/contac-us.service';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  fg !:FormGroup
  IsMatchedPass = new BehaviorSubject<boolean>(false)

  //not logic use this interface
  userMsg: IcontactUs = {
    fullName: "",
    email: "",
    phoneNumber: "",
    message: ""
  };


  constructor(private fb:FormBuilder, private contacUsService:ContacUsService, private router:Router){}


  ngOnInit(): void {
  this.fg = this.fb.group({
    fullname:['',[Validators.required, Validators.minLength(4)]],
    email:   ['',[Validators.required, Validators.email]],
    phone:   ['',[Validators.required, Validators.pattern(/^\d{11}$/)]],
    message :['',[Validators.required, Validators.minLength(10)]]
  })
  }

  OnSubmit(e :Event){
    e.preventDefault();

    if (this.fg.valid )
    {
      this.IsMatchedPass.next(false)

      this.userMsg.fullName = this.fg.get('fullname')?.value;
      this.userMsg.email = this.fg.get('email')?.value;
      this.userMsg.phoneNumber = this.fg.get('phone')?.value;
      this.userMsg.message = this.fg.get('message')?.value;

      this.contacUsService.add(this.userMsg).subscribe(
        {
          next:     () =>{},
          error:    (e) => console.log(e),
          complete: () => {
            this.fg = this.fb.group({
              fullname:['',[Validators.required, Validators.minLength(4)]],
              email:   ['',[Validators.required, Validators.email]],
              phone:   ['',[Validators.required, Validators.pattern(/^\d{11}$/)]],
              message :['',[Validators.required, Validators.minLength(10)]]
            })
          }
        })
    }
    else
    {
      this.IsMatchedPass.next(true)
    }
  }


  // ---------------- [ fullname ]
  get fullnameRequired():boolean|void{return this.fg.get('fullname')?.hasError('required');}
  get fullnameValid(): boolean|void { return this.fg.get('fullname')?.valid;}
  get fullnameTouched():boolean|void{ return this.fg.get('fullname')?.touched;}

  // ---------------- [ email ]
  get emailRequired():boolean|void{return this.fg.get('email')?.hasError('required');}
  get emailValid(): boolean|void { return this.fg.get('email')?.valid;}
  get emailTouched():boolean|void{ return this.fg.get('email')?.touched;}

  // ---------------- [ phone ]
  get phoneRequired():boolean|void{return this.fg.get('phone')?.hasError('required');}
  get phoneValid(): boolean|void  {return this.fg.get('phone')?.valid;}
  get phoneTouched():boolean|void {return this.fg.get('phone')?.touched;}

    // ---------------- [ Message ]
    get messageRequired():boolean|void{return this.fg.get('message')?.hasError('required');}
    get messageValid(): boolean|void  {return this.fg.get('message')?.valid;}
    get messageTouched():boolean|void {return this.fg.get('message')?.touched;}


}
