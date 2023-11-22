import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/Interfaces/iproduct';
import { Ireview } from 'src/app/Interfaces/ireview';
import { ProductlistService } from 'src/app/Services/productlist.service';
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: 'app-review-rate',
  templateUrl: './review-rate.component.html',
  styleUrls: ['./review-rate.component.css']
})
export class ReviewRateComponent {
  reviews !: Ireview[];
  productId !: number;
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

    // Variables to store rating counts
    rate1 = 0;
    rate2 = 0;
    rate3 = 0;
    rate4 = 0;
    rate5 = 0;

  constructor(private reviewapi : ReviewService,private productapi: ProductlistService, private route: ActivatedRoute){}

  ngOnInit(): void {

    this.productId = this.route.snapshot.params['id'];
    // --------------- [ Get Product reviews ]
    this.reviewapi.GetProductReview(this.productId).subscribe({
      next:    (d) => {
        this.reviews = d
          // --------------- [ Loop through reviews and update counts  ]
          if (this.reviews) {
            for (let review of this.reviews) {
              switch (review.rating) {
                case 1:
                  this.rate1++;
                  break;
                case 2:
                  this.rate2++;
                  break;
                case 3:
                  this.rate3++;
                  break;
                case 4:
                  this.rate4++;
                  break;
                case 5:
                  this.rate5++;
                  break;
                default:
                  this.rate5++;
                  break;
              }
            }

          }
      },
      error:   (e) =>   console.log('Unable to get all the reviews',e),
      complete:( ) => console.log('Successfully Got Reviews!')
    });

    // --------------- [ Get Product by id to get avgRatingRounded  ]
    this.productapi.GetProductById(this.productId).subscribe({
      next: (d) => {this.product = d;},
      error: (e) => console.log(e),
      complete: () => console.log('Successfully Got the product!')

      });

  }

    // --------------- [ Calc percentage for each rate count  ]
    getPercentage(count: number): number {
      const totalReviews = this.reviews ? this.reviews.length : 0;
      return totalReviews !== 0 ? (count / totalReviews) * 100 : 0;
    }


}
