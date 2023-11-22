import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Iaddress } from 'src/app/Interfaces/iaddress';
import { AddressService } from 'src/app/Services/address.service';
import { ClaimsService } from 'src/app/Services/claims.service';
import { CurrentuserService } from 'src/app/Services/currentuser.service';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  fg !: FormGroup
  Address : Iaddress = {
    id: 0,
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: 0,
    specialInstructions: ''
  };

  addresses :Iaddress []  = []

  constructor(
    private fb: FormBuilder,
    private register: RegisterService,
    public data: CurrentuserService,
    private claim: ClaimsService,
    private addressesapi:AddressService) { }

  ngOnInit(): void {

    let token = localStorage.getItem('token')
    if (token) {
      let claims = JSON.parse(window.atob(token.split('.')[1]));


      this.data.CurrentUser.MobilePhone = claims[this.claim.claimTypes.MobilePhone]

    }

    this.fg = this.fb.group({
      address: [this.data.CurrentUser.StreetAddress,[Validators.required, Validators.minLength(8)]],
      phone:   [this.data.CurrentUser.MobilePhone,[Validators.required, Validators.pattern(/^\d{11}$/)]]
    })


  // Getting Addresses
  this.addressesapi.GetAddresses().subscribe({
    next: (d) => {
      d.forEach((item: Iaddress) => {
        this.addresses.push(
            {
              id: item.id,
              street: '',
              city: (item.street + " - " +  item.city + " - " + item.country),
              state: '',
              country: '',
              postalCode: 0,
              specialInstructions: ''
            }
            );
          });
    }
  })
  }

  DeleteAddress(id : number) : void {
    this.addressesapi.DeleteAddress(id).subscribe({
      //next: (d) => console.log('Deleting ... '),
      error: (e) => console.log('Unable to Delete: ', e),
      complete: () => {

        console.log('Deleted Successfully!');
        this.addresses = this.addresses.filter( d => d.id != id );

      }
    });
  }



}
