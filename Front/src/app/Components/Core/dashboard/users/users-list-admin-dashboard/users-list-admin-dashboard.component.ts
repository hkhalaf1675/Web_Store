import { Component } from '@angular/core';
import { Iuser } from 'src/app/Interfaces/user/iuser';
import { AdminUserManagerService } from 'src/app/Services/dashboard/admin-user-manager.service';

@Component({
  selector: 'app-users-list-admin-dashboard',
  templateUrl: './users-list-admin-dashboard.component.html',
  styleUrls: ['./users-list-admin-dashboard.component.css']
})
export class UsersListAdminDashboardComponent {
  users:Iuser[] = [];
  pageIndex:number =1;

  constructor(private adminUserManagerService:AdminUserManagerService){}

  ngOnInit(): void {
    this.adminUserManagerService.GetAllUsers(this.pageIndex).subscribe({
      next:(data) =>{this.users= data ; console.log(this.users)},
      error:(error)=>{console.log('error',error)},
      complete: ()=>{},
    });

  }

  // --------------- [ Delete ]
  delete(userName:string){
    this.users = this.users.filter(u => u.userName !== userName);
    this.adminUserManagerService.DeleteUser(userName).subscribe({
      next:() =>{console.log('deleted Succsesfully')},
      error:(error)=>{console.log('error'+JSON.stringify(error))},
      complete: ()=>{},
    });
  }

  // --------------- [ Pageination ]
  next() {
    this.pageIndex = this.pageIndex + 1
    this.adminUserManagerService.GetAllUsers(this.pageIndex).subscribe(
      {
        next: (data) => {
          if (data.length > 0) {
            this.users = data
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
      this.adminUserManagerService.GetAllUsers(this.pageIndex).subscribe(
        {
          next: (data) => {
            this.users = data
          },
          error: () => console.log("failed to bring the data on the next page index"),
          complete: () => console.log("Got Data Successfully!")
        }
      );
    }

  }
}
