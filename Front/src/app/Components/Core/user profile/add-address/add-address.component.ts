import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iaddress } from 'src/app/Interfaces/iaddress';
import { AddressService } from 'src/app/Services/address.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent {
  fg !: FormGroup
  
  address: Iaddress = {
    id: 0,
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: 0,
    specialInstructions: 'N/A'
  };

  constructor(
    private fb: FormBuilder,
    private addaddress: AddressService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      street: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
      //state: ['', [Validators.required, Validators.minLength(3)]],
      //postalCode: ['',],    //[Validators.required, Validators.pattern(/\d{1,}/)]
    });
  }

  onSubmit(e: Event): void {
    e.preventDefault();

    if (this.fg.valid) {

      this.address.street = this.fg.get('street')?.value;
      this.address.city = this.fg.get('city')?.value;
      this.address.country = this.fg.get('country')?.value;


      this.addaddress.AddAddress(this.address).subscribe({
        //next: () => console.log('Changing Password ...'),
        error: (e) => console.log('Failed To Change Password! : ', e),
        complete: () => {

          console.log('Successfully Added!');
          this.router.navigate(['/address']);

        }
      });
    }
    else {
    }
  }


  //#region Getter Properties
  // ---------------- [ street ]
  get streetRequired(): boolean | void { return this.fg.get('street')?.hasError('required'); }
  get streetValid(): boolean | void { return this.fg.get('street')?.valid; }
  get streetTouched(): boolean | void { return this.fg.get('street')?.touched; }

  // ---------------- [ city ]
  get cityRequired(): boolean | void { return this.fg.get('city')?.hasError('required'); }
  get cityValid(): boolean | void { return this.fg.get('city')?.valid; }
  get cityTouched(): boolean | void { return this.fg.get('city')?.touched; }

    // ---------------- [ country ]
    get countryRequired(): boolean | void { return this.fg.get('country')?.hasError('required'); }
    get countryValid(): boolean | void { return this.fg.get('country')?.valid; }
    get countryTouched(): boolean | void { return this.fg.get('country')?.touched; }

  // ---------------- [ state ]
  get stateRequired(): boolean | void { return this.fg.get('state')?.hasError('required'); }
  get stateValid(): boolean | void { return this.fg.get('state')?.valid; }
  get stateTouched(): boolean | void { return this.fg.get('state')?.touched; }

  // ---------------- [ postalCode ]
  get postalCodeRequired(): boolean | void { return this.fg.get('postalCode')?.hasError('required'); }
  get postalCodeValid(): boolean | void { return this.fg.get('postalCode')?.valid; }
  get postalCodeTouched(): boolean | void { return this.fg.get('postalCode')?.touched; }

}
