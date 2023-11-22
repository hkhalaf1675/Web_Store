import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iwritereview } from 'src/app/Interfaces/iwritereview';
import { LoginService } from 'src/app/Services/login.service';
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: 'app-review-write',
  templateUrl: './review-write.component.html',
  styleUrls: ['./review-write.component.css']
})
export class ReviewWriteComponent implements OnInit {
  fillRate!: string[];
  title!: string[];
  selectedRating: number = 0;
  fg !: FormGroup;
  productId !: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private reviewapi: ReviewService, private log: LoginService, private router:Router) { }

  ngOnInit(): void {
    this.fillRate = [
      'bi-star',
      'bi-star',
      'bi-star',
      'bi-star',
      'bi-star'
    ];

    this.title = [
      'Poor',
      'Ok',
      'Good',
      'VeryGood',
      'Excellent'
    ]

    //------------ [ Load the Product Id]
    this.route.params.subscribe(
      d => this.productId = d['id']
    )

    // ----------- [ Initializing the Form Group Using Form Builder ]
    this.fg = this.fb.group({
      reviewText: ['', [Validators.required]]
    })
  }


  submit() {

    if (this.log.IsLoggedIn.value)
    {
      if (this.fg.valid && this.selectedRating > 0) {

        // ----- [ Initialize the review Dto ]
        let review: Iwritereview = {
          text: this.fg.get('reviewText')?.value,
          date: new Date(),
          rating: this.selectedRating,
          productID: this.productId
        }

        // send the revie to the server
        this.reviewapi.AddReview(review).subscribe({
          next: (d)=> console.log('Adding Review...', d),
          error: (e) => console.log(e),
          complete: () => {
            console.log('Review Added Successfully!');

            this.reviewapi.GetProductReview(this.productId).subscribe({
              next: (d) => this.reviewapi.reviewList.next(d),
              error: (e) => console.log('Unable to Load the Reviews: ', e),
              complete: () => console.log('Got Reviews Successfully!')
            });

          }
        })

      }
    }
    else
    {
      // login first and then return back to the page where you were!
      // we have to record its desire to return him to it again to Complete What he was doing
      this.router.navigate(['login'])
    }
  }














  // --------------- [ Rate System ]
  getTooltip(index: number): string {
    return `Rating ${index + 1}`;
  }

  fillStars(index: number): void {
    for (let i = 0; i <= index; i++) {
      this.fillRate[i] = 'bi-star-fill starActive';
    }
    for (let i = index + 1; i < this.fillRate.length; i++) {
      this.fillRate[i] = 'bi-star';
    }
  }

  resetStars(): void {
    for (let i = 4; i >= this.selectedRating; i--) {
      this.fillRate[i] = 'bi-star';
    }
  }

  setRating(index: number): void {
    this.selectedRating = index + 1;
  }


}


