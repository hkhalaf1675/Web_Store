import { Component } from '@angular/core';
import { Iproduct } from 'src/app/Interfaces/iproduct';
import { ProductlistService } from 'src/app/Services/productlist.service';

@Component({
  selector: 'app-home-top-picks',
  templateUrl: './home-top-picks.component.html',
  styleUrls: ['./home-top-picks.component.css']
})
export class HomeTopPicksComponent {
  products !: Iproduct[];
  constructor(private productlist: ProductlistService) { }
  ngOnInit(): void {

    // Load all the products only the first index
    this.productlist.GetTop3Product().subscribe(
      {
        next: (data) => this.products = data,
        error: (e) => console.log('Error: ', e),
        complete: () => console.log("Got Data Successfully!")
      }
    );

  }

}
