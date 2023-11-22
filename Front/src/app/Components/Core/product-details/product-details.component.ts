import { NotExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Iproduct } from 'src/app/Interfaces/iproduct';
import { Iproductquantity } from 'src/app/Interfaces/iproductquantity';
import { IorderAdmin } from 'src/app/Interfaces/order/iorder-admin';
import { CartService } from 'src/app/Services/cart.service';
import { OrderService } from 'src/app/Services/dashboard/order.service';
import { FavoriteService } from 'src/app/Services/favorite.service';
import { LoginService } from 'src/app/Services/login.service';
import { ProductlistService } from 'src/app/Services/productlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Iproduct = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    discount: 0,
    priceAfter: 0,
    condition: 0,
    stockQuantity: 0,
    model: '',
    color: '',
    storage: 0,
    ram: 0,
    camera: '',
    cpu: '',
    screenSize: 0,
    batteryCapacity: 0,
    osVersion: '',
    categoryID: 0,
    categoryName: '',
    brandID: 0,
    brandName: '',
    warranties: [],
    images: [],
    avgRating: 0,
    avgRatingRounded: 0
  };

  productId !: number;
  currentImage: string = 'assets/Images/NotFound.png';
  quantity: number = 1;
  stockQuantity:number = 0;

  // ---------------- [ get related products ]
  relatedProducts : Iproduct[] = []

  // ---------------- [ get All Orders ]
  orders:IorderAdmin[] = [];
  countProductInOrders:number = 0;

  constructor(private productapi: ProductlistService,private orderService:OrderService, private route: ActivatedRoute, private cartapi: CartService, private router: Router, private favoriteapi: FavoriteService, private log: LoginService) { }

  ngOnInit(): void {

    this.productId = this.route.snapshot.params['id']

    // ---------------- [ get Product by Id ]
    this.productapi.GetProductById(this.productId).subscribe({
      next: (d) => {
        this.product = d;
        this.currentImage = d.images[0] ? d.images[0] : 'assets/Images/NotFound.png'
      },
      error: (e) => console.log(e),
      complete: () => {
        console.log('Successfully Got the product!')

        // ---------------- [ get related products ]
        this.productapi.getProductsByBrandName(this.product.brandName).subscribe({
          next: (relatedPrds) => {
            this.relatedProducts = relatedPrds.filter(b => b.id != this.productId);
          },
          error: (e) => console.log(e),
          complete: () => { console.log('Successfully Got the Related products!') }
        });

        // ---------------- [ get All Orders ]
        this.orderService.GetAllOrders(1).subscribe({
          next:(data) =>{ this.orders = data ;},
          error:(error)=>{console.log('error',error)},
          complete: ()=>{
            this.orders.forEach((o) => {
              o.products.forEach((p) => {
                if (p.id == this.productId) {
                  this.countProductInOrders++;
                }
              });
            });

          },
        });

      }
    })


  }

  LoadImage(src: string) {
    this.currentImage = src;
  }

  //------------- [ Add To Cart ]
  AddToCart() {
    if (this.log.IsLoggedIn.value) {
      let data: Iproductquantity = {
        productId: this.productId,
        quantity: this.quantity
      }
      this.cartapi.AddAmount(data).subscribe({
        //next: (d) => console.log(d),
        error: (d) => console.log('failed to add to cart', d.message),
        complete: () => console.log(`Successfully added [${data.quantity}] to cart`)
      })
    }
    else {
      //in case the user is not logged in don't Add the product, so here it must navigate him to the login page
      this.router.navigate(['login']);
    }
  }

  buy() {
    if (this.log.IsLoggedIn.value) {
      let data: Iproductquantity = {
        productId: this.productId,
        quantity: this.quantity
      }
      this.cartapi.AddAmount(data).subscribe({
        //next: (d) => console.log(d),
        error: (d) => console.log('failed to add to cart', d.message),
        complete: () => {
          console.log(`Successfully added [${data.quantity}] to cart`)
          this.router.navigate(['cart'])
        }
      })
    }
    else {
      // In case the user didn't logged in we have to direct him to the login page
      // next improvement we record its cart or desire to buy something that were before clicking on the buy button and login
      this.router.navigate(['login'])
    }
  }

  // ------------- [ Add To Favorite ]
  AddToFavorite() {
    if (this.log.IsLoggedIn.value) {
      this.favoriteapi.AddToFavorite(this.productId).subscribe({
        //next: (d) => console.log('Adding to Cart', d),
        error: (e) => console.log(e),
        complete: () => console.log('Successfully Added to Cart!')
      })
    }
    else {
      this.router.navigate(['login'])
    }
  }

  // ------------- [ Get Quantity Array drop down list  ]
  getRange(quantity: number): number[] {
    return Array.from({ length: quantity }, (_, i) => i + 1);
  }

}
