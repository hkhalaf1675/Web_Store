import { Component } from '@angular/core';
import { Ireviewreturn } from 'src/app/Interfaces/review/Ireviewreturn';
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: 'app-home-reviews',
  templateUrl: './home-reviews.component.html',
  styleUrls: ['./home-reviews.component.css']
})
export class HomeReviewsComponent {

  reviews:Ireviewreturn[] = [];
  ProductsImg: string[] = [
    'assets/Images/blog1.jpg' ,
    'assets/Images/blog2.jpg' ,
    'assets/Images/blog3.jpg' ,
    'assets/Images/blog4.jpg'
  ];


  constructor(private reviewService:ReviewService){}

  ngOnInit(): void {
    this.reviewService.GetAll().subscribe({
      next:(data) =>{this.reviews= data},
      error:(error)=>{console.log('error'+error)},
      complete: ()=>{},
    });
    
    
  }
}
