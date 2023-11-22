import { Component, OnInit } from '@angular/core';
import { Iaddress } from 'src/app/Interfaces/iaddress';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddressService } from 'src/app/Services/address.service';
import { ClaimsService } from 'src/app/Services/claims.service';
import { CurrentuserService } from 'src/app/Services/currentuser.service';
import { RegisterService } from 'src/app/Services/register.service';
import { PhoneService } from 'src/app/Services/phone.service';
import { Iphones } from 'src/app/Interfaces/iphones';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.css']
})
export class PhonesComponent implements OnInit {


  phones: Iphones[] = []

  constructor(
    private fb: FormBuilder,
    private register: RegisterService,
    public data: CurrentuserService,
    private claim: ClaimsService,
    private addressesapi: AddressService,
    private phoneapi: PhoneService
  ) { }

  ngOnInit(): void {

    // Getting Phones
    this.phoneapi.GetAllPhones().subscribe({
      next: (d) => {
        this.phones = d
      },
      error: (e) => console.log('Unable to get the phones: ', e),
      complete: () => {
        console.log('Got Phones Successfully!')
      }
    });

  }


  //#region Delete Phone
  DeletePhone(phone: string): void {

    let formdata = new FormData();
    formdata.append('phone', phone);

    this.phoneapi.DeletePhone(phone).subscribe({
      //next: (d) => console.log('Deleting ... '),
      error: (e) => console.log('Unable to Delete Phone: ', e),
      complete: () => {
        console.log('Phone Deleted Successfully!');
        this.phones = this.phones.filter(d => d.phoneNumber != phone);
      }
    })
  }
  //#endregion

}
