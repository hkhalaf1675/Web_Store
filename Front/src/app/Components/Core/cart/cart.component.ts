import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Icart } from 'src/app/Interfaces/icart';
import { Iproductquantity } from 'src/app/Interfaces/iproductquantity';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart !: Icart[];
  quantities: number[] = [];
  prices :number [] = [];
  totalPrice :number = 0;


  constructor(private cartapi: CartService, private router: Router){}

  // ------------- [ On Component Initialization ]
  ngOnInit(): void {
    this.cartapi.GetCart().subscribe({
      next: (d) => {
        this.cart = d;
        this.cart.forEach((item : Icart ) => {
          if (item.productQuantity <= 5){
            this.quantities.push(item.productQuantity)
            this.prices.push(item.productPrice)
          }
          else
            this.quantities.push(5)
        })
      },
      error: (e) => console.log(e),
      complete:()=> {
        console.log('Successfully Got Cart')
        this.UpdatetotalPrice()
      }
    })
  }

  // ------------- [ Delete Cart Element ]
  deletecart(id:number)
  {
    this.cartapi.DeleteCart(id).subscribe({
      //next: (d) => console.log('Deleting the Cart'),
      error: (e) => console.log(e),
      complete: () => {
        console.log('Cart deleted Successfully!')
        this.cart = this.cart.filter(c => c.productId != id)

        this.quantities = []
        this.prices = []

        this.cartapi.GetCart().subscribe({
          next: (d) => {
            this.cart = d;
            this.cart.forEach((item : Icart ) => {
              if (item.productQuantity <= 5){
                this.quantities.push(item.productQuantity)
                this.prices.push(item.productPrice)
              }
              else
                this.quantities.push(5)
            })
          },
          error: (e) => console.log(e),
          complete:()=> {
            console.log('Successfully Got Cart')
            this.UpdatetotalPrice()
          }
        })

      }
    })
  }

  // ------------- [ Update Cart Element's Amount ]
  UpdateAmount(id:number, i:number)
  {
    let data : Iproductquantity =
    {
      productId : id,
      quantity : this.quantities[i]
    }

    this.cartapi.AddAmount(data).subscribe({
      next: (d) => console.log('data Updated', d),
      error: (e) => console.log('unable to update the amount'),
      complete: () => {
        console.log('Successfully Updated!')

        // Update the total price after updating the Ammount
        this.UpdatetotalPrice()

      }
    })
  }

  // ------------- [ Update Total Amount ]
  UpdatetotalPrice(){
    this.totalPrice = 0
    for (let i = 0 ; i < this.prices.length; i ++){
      this.totalPrice += this.prices[i] * this.quantities[i]
    }
  }

  // -------------- [ Checkout Button ]
  checkout(){
    if (this.totalPrice == 0)
    {
      this.router.navigate(['products']) //products
    }
    else
    {
      this.router.navigate(['checkout'])
    }
  }

}
