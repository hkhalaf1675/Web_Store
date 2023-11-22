import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhoneService } from 'src/app/Services/phone.service';

@Component({
  selector: 'app-addphone',
  templateUrl: './addphone.component.html',
  styleUrls: ['./addphone.component.css']
})
export class AddphoneComponent {
  fg !: FormGroup

  phone: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private phoneapi: PhoneService
  ) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^0\d{10}$/)]]
    });
  }

  onSubmit(e: Event): void {
    e.preventDefault();

    if (this.fg.valid) {

      //this.phone = this.fg.get('phone')?.value;

      let formData = new FormData();
      formData.append('phone', this.fg.get('phone')?.value);

      //#region Add new phone
      this.phoneapi.AddNewPhone(formData).subscribe({
        //next: () => console.log('Changing Password ...'),
        error: (e) => console.log('Failed To Add new Phone: ', e),
        complete: () => {
          console.log('Successfully Added!');
          this.router.navigate(['/phones']);
        }
      });
      //#endregion


    }
    else {
      console.log('Form not valid')
    }
  }



  //#region Phone properties for form validation
  // ---------------- [ phone ]
  get phoneRequired(): boolean | void { return this.fg.get('phone')?.hasError('required'); }
  get phoneValid(): boolean | void { return this.fg.get('phone')?.valid; }
  get phoneTouched(): boolean | void { return this.fg.get('phone')?.touched; }
  //#endregion

}
