import { Component } from '@angular/core';
import { Ireviewreturn } from 'src/app/Interfaces/review/Ireviewreturn';
import { ReviewService } from 'src/app/Services/review.service';


@Component({
  selector: 'app-reviews-list-admin-dashboard',
  templateUrl: './reviews-list-admin-dashboard.component.html',
  styleUrls: ['./reviews-list-admin-dashboard.component.css']
})
export class ReviewsListAdminDashboardComponent {
  reviews:Ireviewreturn[] = [];
  pageIndex:number =1;

  constructor(private reviewService:ReviewService){}

  ngOnInit(): void {
    this.reviewService.getAllAdmin(this.pageIndex).subscribe({
      next:(data) =>{this.reviews= data},
      error:(error)=>{console.log('error'+error)},
      complete: ()=>{},
    });
    console.log(this.reviews);
  }

   // --------------- [ Pageination ]
    next() {
    this.pageIndex = this.pageIndex + 1
    this.reviewService.getAllAdmin(this.pageIndex).subscribe(
      {
        next: (data) => {
          if (data.length > 0) {
            this.reviews = data
          }
          else {
            this.pageIndex = this.pageIndex - 1;
          }
        },
        error: () => console.log("failed to bring the data on the next page index"),
        complete: () => console.log("Got Data Successfully!")
      }
    );
  }

  prev() {
    if (this.pageIndex > 1) {
      this.pageIndex = this.pageIndex - 1 ;
      this.reviewService.getAllAdmin(this.pageIndex).subscribe(
        {
          next: (data) => {
            this.reviews = data
          },
          error: () => console.log("failed to bring the data on the next page index"),
          complete: () => console.log("Got Data Successfully!")
        }
      );
    }

  }

  delete(id:number){
    this.reviews = this.reviews.filter(r => r.id !== id);
    this.reviewService.deleteAdmin(id).subscribe({
      next:() =>{console.log('deleted Succsesfully')},
      error:(error)=>{console.log('error'+JSON.stringify(error))},
      complete: ()=>{},
    });
  }
}
