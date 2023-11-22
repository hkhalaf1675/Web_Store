import { Component } from '@angular/core';
import { IorderAdmin } from 'src/app/Interfaces/order/iorder-admin';
import { OrderStatus } from 'src/app/Interfaces/order/order-status';
import { OrderService } from 'src/app/Services/dashboard/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  orders:IorderAdmin[] = [];

  constructor(private orderService:OrderService){}

  ngOnInit(): void {
    this.orderService.GetAllUserOrders().subscribe({
      next:(data) =>{

        console.log(data)
        this.orders = data ;

      },
      error:(error)=>{console.log('Unable to load Data: ',error)},
      complete: ()=>{
        console.log('Got Orders Successfully!')
      },
    });
  }

  // ---------------- [ get Order Status Name ]
  getOrderStatusName(status: number): string {
    return OrderStatus[status];
  }
}
