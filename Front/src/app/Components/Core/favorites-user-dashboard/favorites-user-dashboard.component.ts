import { Component, OnInit } from '@angular/core';
import { Ifavorite } from 'src/app/Interfaces/ifavorite';
import { Iproduct } from 'src/app/Interfaces/iproduct';
import { FavoriteService } from 'src/app/Services/favorite.service';

@Component({
  selector: 'app-favorites-user-dashboard',
  templateUrl: './favorites-user-dashboard.component.html',
  styleUrls: ['./favorites-user-dashboard.component.css']
})
export class FavoritesUserDashboardComponent implements OnInit{

  favorites !: Ifavorite[];
  constructor(private favoritelsit: FavoriteService){}

ngOnInit(): void {
  this.favoritelsit.GetFavorite().subscribe(
    {
      next: (data) => this.favorites = data,
      error: () => console.log('failed to get favorites'),
      complete: () => console.log('Successfully got Favorites!')
    }
  );
}

  // delete favorite for the current user
  deleteFavorite(id:number){
    this.favoritelsit.DeleteFavorite(id).subscribe({
      next: () => console.log('Deleting...'),
      error: () => console.log('Failed To delete Favorite'),
      complete: () => {
        // filter the list of the favorites to prevent the requirement of reloading the page to take effect
        this.favorites = this.favorites.filter(f=> f.id != id)
      }
    });
  }

}
