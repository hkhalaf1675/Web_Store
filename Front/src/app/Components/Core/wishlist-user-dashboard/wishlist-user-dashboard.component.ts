import { Component, OnInit } from '@angular/core';
import { Iwishlist } from 'src/app/Interfaces/iwishlist';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-wishlist-user-dashboard',
  templateUrl: './wishlist-user-dashboard.component.html',
  styleUrls: ['./wishlist-user-dashboard.component.css']
})
export class WishlistUserDashboardComponent implements OnInit{

  wishlist !: Iwishlist[];
  constructor(private wishlistapi: WishlistService){}

  ngOnInit(): void {
    this.wishlistapi.GetWishlist().subscribe(
      {
        next: (data) =>this.wishlist = data,
        error: () => console.log('failed to get wishlist'),
        complete: () => console.log('Successfully got wishlist!')
      }
    );
  }

  // delete wishlist for the current user
  deleteWishlist(id:number){
    this.wishlistapi.DeleteWishlist(id).subscribe({
      next: () => console.log('Deleting...'),
      error: () => console.log('Failed To delete wishlist'),
      complete: () => {
        // filter the list of the wishlist to prevent the requirement of reloading the page to take effect
        this.wishlist = this.wishlist.filter(w=> w.id != id)
      }
    });
  }
}
