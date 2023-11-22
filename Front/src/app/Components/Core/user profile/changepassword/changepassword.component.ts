import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Ipassword } from 'src/app/Interfaces/ipassword';
import { PasswordService } from 'src/app/Services/password.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  fg!: FormGroup;
  IsMatchedPass = new BehaviorSubject<boolean>(false);
  user: Ipassword = { oldPassword: '', newPassword: '' };

  constructor(
    private fb: FormBuilder,
    private editpass: PasswordService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      oldpassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/)]],
      newpassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(e: Event): void {
    e.preventDefault();

    if (this.fg.valid && this.IsMatched) {

      this.IsMatchedPass.next(false);
      this.user.newPassword = this.fg.get('newpassword')?.value;
      this.user.oldPassword = this.fg.get('oldpassword')?.value;

      this.editpass.Editpassword(this.user).subscribe({
        next: () => console.log('Changing Password ...'),
        error: (e) => console.log('Failed To Change Password! : ',e),
        complete: () => {
          console.log('Successfully Change Password!');
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        }
      });
    } else {
      this.IsMatchedPass.next(true);
    }
  }


  //#region Getter Properties
  // ---------------- [ email ]
  get emailRequired(): boolean | void { return this.fg.get('email')?.hasError('required'); }
  get emailValid(): boolean | void { return this.fg.get('email')?.valid; }
  get emailTouched(): boolean | void { return this.fg.get('email')?.touched; }

  // ---------------- [ old password ]
  get oldpassRequired(): boolean | void { return this.fg.get('password')?.hasError('required'); }
  get oldpassValid(): boolean | void { return this.fg.get('password')?.valid; }
  get oldpassTouched(): boolean | void { return this.fg.get('password')?.touched; }

  // ---------------- [ new password ]
  get newpassRequired(): boolean | void { return this.fg.get('password')?.hasError('required'); }
  get newpassValid(): boolean | void { return this.fg.get('password')?.valid; }
  get newpassTouched(): boolean | void { return this.fg.get('password')?.touched; }
  get IsMatched(): boolean | void {
    return this.fg.get('newpassword')?.value === this.fg.get('confirmPassword')?.value;
  }

  // ---------------- [ confirm ]
  get confirmPasswordRequired(): boolean | void { return this.fg.get('confirm')?.hasError('required'); }
  get confirmPasswordValid(): boolean | void { return this.fg.get('confirm')?.valid; }
  get confirmPasswordTouched(): boolean | void { return this.fg.get('confirm')?.touched; }
  //#endregion




}
