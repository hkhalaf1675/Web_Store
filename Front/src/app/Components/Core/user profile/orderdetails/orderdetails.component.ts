import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IorderAdmin } from 'src/app/Interfaces/order/iorder-admin';
import { OrderStatus } from 'src/app/Interfaces/order/order-status';
import { OrderService } from 'src/app/Services/dashboard/order.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent {
  Order !:IorderAdmin;
  orderId : number = 0 ;

  orders:IorderAdmin[] = []; //just for test 

  constructor(private orderService:OrderService , private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {

    // get order id from URL
    this.orderId = this.activatedRoute.snapshot.params['id'];

    this.orderService.GetOrderById(this.orderId).subscribe({
      next:(data) =>{ this.Order = data ;},
      error:(error)=>{console.log('error',error)},
      complete: ()=>{},
    });

  }

  // ---------------- [ get Order Status Name ]
  getOrderStatusName(status: number): string {
    return OrderStatus[status];
  }
  
}
