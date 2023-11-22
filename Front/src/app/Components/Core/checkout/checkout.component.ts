import { ClaimsService } from './../../../Services/claims.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig, IPhone } from 'ngx-paypal';
import { BehaviorSubject } from 'rxjs';
import { Iaddress } from 'src/app/Interfaces/iaddress';
import { Icart } from 'src/app/Interfaces/icart';
import { Iorder } from 'src/app/Interfaces/iorder';
import { Iphones } from 'src/app/Interfaces/iphones';
import { AddressService } from 'src/app/Services/address.service';
import { CartService } from 'src/app/Services/cart.service';
import { OrderService } from 'src/app/Services/dashboard/order.service';
import { PhoneService } from 'src/app/Services/phone.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  // Order Container
  order: Iorder = {
    addressId: 0,
    payMethod: '',
    phoneNumebr: ''
  }


  fg !: FormGroup

  //#region  Calculations
  products !: Icart[];
  cartLength: number = 0;
  cartPrice: number = 0;
  promotion: number = 0;
  discounts: number = 0;
  tax: number = 0;
  totalPrice: number = 0;
  //#endregion


  // Address registeration container
  addresstoadd: Iaddress = {
    id: 0,
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: 0,
    specialInstructions: 'N/A'
  };

  // Just for show
  fullname: string = '';
  address: string = '';

  // Data to sent to endpoint
  phonenumber: string = '';
  addressId: number = 0;

  // Select Options
  phones: Iphones[] = [];
  addresses: Iaddress[] = [];

  // for paypal
  paypalConfig?: IPayPalConfig;

  //#region Observables
  addAddress = new BehaviorSubject<boolean>(false);
  ChooseAddress = new BehaviorSubject<boolean>(false);
  AddPhone = new BehaviorSubject<boolean>(false);
  ChoosePhone = new BehaviorSubject<boolean>(false);
  //#endregion

  constructor(

    //#region Services
    private fb: FormBuilder,
    private cartapi: CartService,
    private claim: ClaimsService,
    private addressapi: AddressService,
    private phoneapi: PhoneService,
    private orderapi: OrderService,
    private router : Router
    //#endregion

  ) { }


  ngOnInit(): void {

    //#region Getting the Claims from the token (personal information)
    let token = localStorage.getItem('token')
    if (token) {
      let claims = JSON.parse(window.atob(token.split('.')[1]));
      this.fullname = claims[this.claim.claimTypes.GivenName]
    }
    //#endregion

    //#region Getting Cart Data
    this.cartapi.GetCart().subscribe({
      next: (d) => {
        this.products = d
        this.products.forEach(item => {

          this.cartLength += item.productQuantity
          this.cartPrice += (item.productPrice * item.productQuantity)
          this.discounts += (item.productQuantity * item.discount)

        });
      },
      error: (e) => console.log('Unable to Get Cart : ', e),
      complete: () => {
        console.log('Got Cart Successfully!')

        // Calculating the Total price
        this.totalPrice = this.cartPrice + this.tax - (this.discounts + ((this.promotion / 100) * this.cartPrice))
      }
    });
    //#endregion

    //#region Form Group Initialization
    this.fg = this.fb.group({
      addAddress: ['', [Validators.required, Validators.pattern(/^([a-zA-Z]{3,})(\s*),(\s*)*([a-zA-Z]{3,})(\s*),(\s*)*([a-zA-Z]{3,})(\s*)$/)]],
      AddPhone: ['', [Validators.required, Validators.pattern(/^0\d{10}$/)]],
      ChooseAddress: [''],  //[Validators.required, Validators.minLength(4)]
      ChoosePhone: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/)]],
      street: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
    })
    //#endregion

    //#region Get All user Addresses
    this.addressapi.GetAddresses().subscribe({
      next: (d) => {
        this.addresses = d
        if (d[0]) {
          this.address = this.addresses[0].street + ', ' + this.addresses[0].city + ', ' + this.addresses[0].country
          this.addressId = this.addresses[0].id;
        }
        else {
          this.address = 'Empty'
        }
      },
      error: (e) => console.log('Failed To Get User Addresses: ', e),
      complete: () => {
        console.log('Got Addresses Successfully!')
      }
    });
    //#endregion

    //#region Get All phones for the user
    this.phoneapi.GetAllPhones().subscribe({
      next: (d) => {
        this.phones = d
        if (d[0]) {
          this.phonenumber = this.phones[0].phoneNumber;
        }
        else {
          this.phonenumber = 'Empty'
        }
      }
    })
    //#endregion

    this.paypalInitConfig(); // for paypal

  }

  //#region Phone Add and Choose visibility
  phoneAdd(e: any): void {

    if (this.AddPhone.value) {
      if (this.fg.get('AddPhone')?.valid) {

        // Add new number for the user
        let formData = new FormData();
        formData.append('phone', this.fg.get('AddPhone')?.value);

        // Adding new phone number
        this.phoneapi.AddNewPhone(formData).subscribe({
          next: (d) => console.log('Addin new Number'),
          error: (e) => console.log('Unable to add new phone: ', e),
          complete: () => {

            console.log('Phone Added Successfully!')
            this.phonenumber = this.fg.get('AddPhone')?.value;
            // refresh the addresses
            this.phoneapi.GetAllPhones().subscribe({
              next: (d) => {
                this.phones = d
              }
            })

            // clear the form
            this.AddPhone.next(false);
            this.fg.reset()
          }
        })
      }
      else {
        this.AddPhone.next(false);
      }
    }
    else {
      this.AddPhone.next(true);
    }
  }

  phoneChoose(e: any): void {
    if (this.ChoosePhone.value) {
      this.ChoosePhone.next(false);
    }
    else {
      this.ChoosePhone.next(true);
    }
  }
  //#endregion

  //#region Address Add and choose visibility
  addressAdd(e: any): void {
    if (this.addAddress.value) {

      // In case the  form of the address is valid
      if (this.fg.get('street')?.valid && this.fg.get('city')?.valid && this.fg.get('country')?.valid) {

        // Get the address data from the form
        this.addresstoadd.street = this.fg.get('street')?.value;
        this.addresstoadd.city = this.fg.get('city')?.value;
        this.addresstoadd.country = this.fg.get('country')?.value;

        // Add new address
        this.addressapi.AddAddress(this.addresstoadd).subscribe({
          //next: () => console.log('Changing Password ...'),
          error: (e) => console.log('Failed To Change Password! : ', e),
          complete: () => {
            console.log('Successfully Added!');

            this.address = this.addresstoadd.street + ', ' + this.addresstoadd.city + ', ' + this.addresstoadd.country

            // Refresh the Addresses list
            this.addressapi.GetAddresses().subscribe({
              next: (d) => {
                this.addresses = d
              },
              error: (e) => console.log('Failed To Get User Addresses: ', e),
              complete: () => {
                console.log('Got Addresses Successfully!')
              }
            });

            this.addAddress.next(false);
            this.fg.reset()
          }
        });

      }
      else {
        this.addAddress.next(false);
      }
    }
    else {
      this.addAddress.next(true);
    }
  }


  AddressChoose(e: any): void {
    if (this.ChooseAddress.value) {
      this.ChooseAddress.next(false);
    }
    else {
      this.ChooseAddress.next(true);
    }
  }
  //#endregion

  //#region Assign Phone Number
  AssignPhone(e: any): void {
    this.phonenumber = e.target.options[e.target.selectedIndex].text;
    this.ChoosePhone.next(false)
  }
  //#endregion

  //#region Assign Address
  AssignAddress(e: any): void {
    this.addressId = e.target.value;
    this.address = e.target.options[e.target.selectedIndex].text;
    this.ChooseAddress.next(false)
  }
  //#endregion

  //#region Properties for address and phone
  // ---------------- [ address ]
  get addressRequired(): boolean | void { return this.fg.get('addAddress')?.hasError('required'); }
  get addressValid(): boolean | void { return this.fg.get('addAddress')?.valid; }
  get addressTouched(): boolean | void { return this.fg.get('addAddress')?.touched; }

  // ---------------- [ phone ]
  get phoneRequired(): boolean | void { return this.fg.get('AddPhone')?.hasError('required'); }
  get phoneValid(): boolean | void { return this.fg.get('AddPhone')?.valid; }
  get phoneTouched(): boolean | void { return this.fg.get('AddPhone')?.touched; }

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

  //#endregion

  //#region Paypal Method
  private paypalInitConfig(): void {
    this.paypalConfig = {
      clientId: 'AcjwrP2NINSvMRyEJVuafImY0GtGVj4B4Nn1hJEZD0yBAAQAFmWe4vGaZLzspkfbK5ZEKTgymVM9ju0s', // -----------------------------------------------------
      currency: 'USD',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.totalPrice.toString()
            }
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(() => {
          console.log('onApprove - you can get full order details inside onApprove: ');
        }
        )
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);

      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    }
  }
  //#endregion

  //#region Submit Checkout
  SubmitCheckout(): void {
    if (this.addressId != 0 && this.phonenumber.length > 10 && this.cartLength > 0) {
      this.order.addressId = this.addressId;
      this.order.phoneNumebr = this.phonenumber;
      this.order.payMethod = 'PayPal';

      this.orderapi.AddNewOrder(this.order).subscribe({
        next: (d) => console.log('Adding new order'),
        error: (e) => console.log('Unable to save order : ', e),
        complete: () => {
          console.log('Order Saved Sucessfully!')

          //#region Refresh Cart Data
          this.cartapi.GetCart().subscribe({
            next: (d) => {
              this.products = d
            },
            error: (e) => console.log('Unable to Get Cart : ', e),
            complete: () => {
              console.log('Got Cart Successfully!')

              // Calculating the Total price
              this.totalPrice = 0
              this.cartLength= 0
              this.cartPrice = 0
              this.discounts = 0
            }
          });
          //#endregion

        }
      });
    }
    else if ( this.cartLength == 0)
    {
      this.router.navigate(['/products'])
    }
  }
  //#endregion

}
