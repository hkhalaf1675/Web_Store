import { WishlistService } from './../../../Services/wishlist.service';
import { FavoriteService } from './../../../Services/favorite.service';
import { IproductFilter } from './../../../Interfaces/iproductfilter';
import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/Interfaces/iproduct';
import { ProductlistService } from 'src/app/Services/productlist.service';
import { CartService } from 'src/app/Services/cart.service';
import { Iproductquantity } from 'src/app/Interfaces/iproductquantity';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { BehaviorSubject } from 'rxjs';
import { BrandService } from 'src/app/Services/dashboard/brand.service';
import { CategoryService } from 'src/app/Services/dashboard/category.service';
import { Ibrandreturn } from 'src/app/Interfaces/brand/ibrandreturn';
import { Icategoryreturn } from 'src/app/Interfaces/category/icategoryreturn';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {



  currentIndex: number = 1;
  products !: Iproduct[];



  brands: Ibrandreturn[] = [];
  categories: Icategoryreturn[] = [];
  fg !: FormGroup;

  filters: IproductFilter = {
    sort: '',
    categoryid: '',
    brandId: '',
    condition: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    search: '',
    pageSize: '',
    pageIndex: this.currentIndex.toString(),
  }


  constructor(
    private productlist: ProductlistService,
    private favoriteservice: FavoriteService,
    private wilshlistservice: WishlistService,
    private cartapi: CartService,
    private router: Router,
    private login: LoginService,
    private brandapi: BrandService,
    private categoryapi: CategoryService,
    private fb: FormBuilder
  ) { }

  //#region ngOninit
  ngOnInit(): void {

    //Get All Products
    this.productlist.getProducts(this.filters).subscribe({
      next: (data) => this.products = data,
      error: (e) => console.log("failed to bring the data: ", e),
      complete: () => console.log("Got Data Successfully!")
    }
    );

    // Get All brands
    this.brandapi.getAll().subscribe({
      next: (data) => this.brands = data,
      error: (e) => console.log("Failed To Bring Brands: ", e),
      complete: () => console.log("Got Brands Successfully!")
    })

    // Get All Categories
    this.categoryapi.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (e) => console.log("Failed To Bring Categories: ", e),
      complete: () => console.log("Got Categories Successfully!")
    })


    // Initializing Filter Form Group
    this.fg = this.fb.group({
      search: [''],
      sort: ['name'],
      category: [''],
      brand: [''],
      condition: [''],
      rating: [''],
      min: [this.MinValue],
      max: [this.MaxValue]
    })

  }
  //#endregion


  //#region Filters
  applyFilter(e: Event) {
    e.preventDefault();

    this.filters.search =
    this.filters.search = this.fg?.get('search')?.value;
    this.filters.sort = this.fg?.get('sort')?.value;
    this.filters.categoryid = this.fg?.get('category')?.value;
    this.filters.brandId = this.fg?.get('brand')?.value;
    this.filters.condition = this.fg?.get('condition')?.value;
    this.filters.rating = this.fg?.get('rating')?.value;
    this.filters.minPrice = this.fg?.get('min')?.value;
    this.filters.maxPrice = this.fg?.get('max')?.value;

    // Get products filtered
    this.productlist.getProducts(this.filters).subscribe({
      next: (data) => {
        this.products = data
        console.log(data)
      },
      error: (e) => console.log("Failed To Bring Filtered Products: ", e),
      complete: () => {
        console.log("Got Filtered Products Successfully!")

      }
    })

  }
  //#endregion


  //#region Products
  // -------------- [ Add to ]
  AddToFavorite(id: number) {

    if (this.login.IsLoggedIn.value) {
      this.favoriteservice.AddToFavorite(id).subscribe({
        //next: () => console.log("adding to favorite.."),
        error: (e) => console.log("Error happened during adding to favorites: ", e),
        complete: () => console.log("Added to favorite Successfully!")
      })
    }
    else {
      //in case the user is not logged in don't Add the product, so here it must navigate him to the login page
      this.router.navigate(['login']);
    }


  }

  AddToWithList(id: number) {

    if (this.login.IsLoggedIn.value) {
      this.wilshlistservice.AddToWishlist(id).subscribe({
        //next: () => console.log("adding to wishlist.."),
        error: (e) => console.log("Error happened during adding to wishlist: ", e),
        complete: () => console.log("Added to Wishlist Successfully!")
      })
    }
    else {
      //in case the user is not logged in don't Add the product, so here it must navigate him to the login page
      this.router.navigate(['login']);
    }
  }

  AddToCart(id: number) {
    if (this.login.IsLoggedIn.value) {
      let data: Iproductquantity = {
        productId: id,
        quantity: 1
      }
      this.cartapi.AddToCart(data).subscribe({
        //next: (d) => console.log(d),
        error: (e) => console.log('failed to add to cart: ', e),
        complete: () => console.log('Added to Cart Successfully!')
      })
    }
    else {
      //in case the user is not logged in don't Add the product, so here it must navigate him to the login page
      this.router.navigate(['login']);
    }

  }

  // --------------- [ Pageination ]
  next() {
    this.filters.pageIndex = (this.currentIndex + 1).toString();
    this.productlist.getProducts(this.filters).subscribe(
      {
        next: (data) => {
          if (data.length > 0) {
            this.currentIndex++
            this.products = data
          }
          else {
            this.filters.pageIndex = this.currentIndex.toString();
          }
        },
        error: () => console.log("failed to bring the data on the next page index"),
        complete: () => console.log("Got Data Successfully!")
      }
    );
  }

  prev() {
    if (this.currentIndex > 1) {
      this.filters.pageIndex = (this.currentIndex - 1).toString();
      this.productlist.getProducts(this.filters).subscribe(
        {
          next: (data) => {
            this.currentIndex--
            this.products = data
          },
          error: () => console.log("failed to bring the data on the next page index"),
          complete: () => console.log("Got Data Successfully!")
        }
      );
    }
  }
  //#endregion




  //#region Slider Price
  min: number = 0
  max: number = 100000

  MinValue: number = this.min
  MaxValue: number = this.max

  assignMinValue(e: any): void {
    this.MinValue = e.target.value
  }

  assignMaxValue(e: any): void {
    this.MaxValue = e.target.value
  }

  //#endregion

}
