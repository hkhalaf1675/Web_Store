import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ireview } from 'src/app/Interfaces/ireview';
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  reviews !: Ireview[];
  productId !: number;

  constructor(public reviewapi : ReviewService, private route: ActivatedRoute){}

  ngOnInit(): void {
    // --------------- [ Get Product reviews ]
    this.reviewapi.GetProductReview(this.route.snapshot.params['id']).subscribe({
      next:    (d) =>   this.reviewapi.reviewList.next(d) ,
      error:   (e) =>   console.log('Unable to get all the reviews',e),
      complete:( ) => {
        console.log('Successfully Got Reviews!')
      }
    })


  }

  getTooltip(index: number): string {
    return `Rating ${index + 1}`;
  }

  fill(index: number): void {

  }





}
