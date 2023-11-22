import { Component } from '@angular/core';
import { IorderAdmin } from 'src/app/Interfaces/order/iorder-admin';
import { OrderStatus } from 'src/app/Interfaces/order/order-status';
import { OrderService } from 'src/app/Services/dashboard/order.service';

@Component({
  selector: 'app-orders-list-dashboard',
  templateUrl: './orders-list-dashboard.component.html',
  styleUrls: ['./orders-list-dashboard.component.css']
})
export class OrdersListDashboardComponent {
  orders:IorderAdmin[] = [];
  pageIndex:number =1;

  constructor(private orderService:OrderService){}

  ngOnInit(): void {
    this.orderService.GetAllOrders(this.pageIndex).subscribe({
      next:(data) =>{ this.orders = data ; console.log(this.orders)},
      error:(error)=>{console.log('error',error)},
      complete: ()=>{},
    });
  }

  // ---------------- [ get Order Status Name ]
  getOrderStatusName(status: number): string {
    return OrderStatus[status];
  }
  
  // --------------- [ Pageination ]
  next() {
    this.pageIndex = this.pageIndex + 1
    this.orderService.GetAllOrders(this.pageIndex).subscribe(
      {
        next: (data) => {
          if (data.length > 0) {
            this.orders = data
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
      this.orderService.GetAllOrders(this.pageIndex).subscribe(
        {
          next: (data) => {
            this.orders = data
          },
          error: () => console.log("failed to bring the data on the next page index"),
          complete: () => console.log("Got Data Successfully!")
        }
      );
    }

  }
}
