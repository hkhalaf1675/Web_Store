import { Component } from '@angular/core';
import { IcontactUs } from 'src/app/Interfaces/icontact-us';
import { ContacUsService } from 'src/app/Services/dashboard/contac-us.service';

@Component({
  selector: 'app-contact-admin-dashboard',
  templateUrl: './contact-admin-dashboard.component.html',
  styleUrls: ['./contact-admin-dashboard.component.css']
})
export class ContactAdminDashboardComponent {
  contactUsMsgs:IcontactUs[] = [];
  pageIndex:number =1;

  constructor(private contacUsService:ContacUsService){}

  ngOnInit(): void {
    this.contacUsService.getAll(this.pageIndex).subscribe({
      next:(data) =>{this.contactUsMsgs= data},
      error:(error)=>{console.log('error'+error)},
      complete: ()=>{},
    });
  }

   // --------------- [ Pageination ]
    next() {
    this.pageIndex = this.pageIndex + 1
    this.contacUsService.getAll(this.pageIndex).subscribe(
      {
        next: (data) => {
          if (data.length > 0) {
            this.contactUsMsgs = data
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
      this.contacUsService.getAll(this.pageIndex).subscribe(
        {
          next: (data) => {
            this.contactUsMsgs = data
          },
          error: () => console.log("failed to bring the data on the next page index"),
          complete: () => console.log("Got Data Successfully!")
        }
      );
    }

  }

}
