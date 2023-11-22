import { Component } from '@angular/core';

@Component({
  selector: 'app-home-brands',
  templateUrl: './home-brands.component.html',
  styleUrls: ['./home-brands.component.css']
})
export class HomeBrandsComponent {
  brands: { name: string, imageUrl: string }[] = [];

  constructor() {
    // Populate the brands array with your data
    this.brands = [
      { name: 'Apple', imageUrl: 'assets/Images/apple.png' },
      { name: 'Lenovo', imageUrl: 'assets/Images/lenovo.png' },
      { name: 'Samsung', imageUrl: 'assets/Images/samsung.png' },
      { name: 'Dell', imageUrl: 'assets/Images/dell.png' },
      { name: 'HP', imageUrl: 'assets/Images/hp.png' }
    ];
  }
}
