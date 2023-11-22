import { Component } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { AdminUserManagerService } from 'src/app/Services/dashboard/admin-user-manager.service';

@Component({
  selector: 'app-dashhome',
  templateUrl: './dashhome.component.html',
  styleUrls: ['./dashhome.component.css']
})
export class DashhomeComponent {
  totalUsers !: number;
  totalProducts !: number;
  totalOrders !: number;
  totalSell !: number;

  // ---------------- [ SignalR ]
  private hubConnectionBuilder!: HubConnection;
  offers: any[] = [];

  constructor(private adminUserManagerService: AdminUserManagerService) { }

  ngOnInit(): void {

    // ---------------- [ SignalR ]
    this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('https://localhost:7003/offers').configureLogging(LogLevel.Information).build();
    this.hubConnectionBuilder.start()
      .then(() => console.log('Connection started.......!'))
      .catch((err : Error) => console.error('Error while connecting with the server:', err));
    this.hubConnectionBuilder.on('SendOffersToUser', (result: any) => {
      this.offers.push(result);
    });

    // ---------------- [ Get Users Count ]
    this.adminUserManagerService.GetUsersCount().subscribe({
      next: (d) => { this.totalUsers = d },
      error: (error) => { console.log('error' + error) },
      complete: () => { },
    });


    // ---------------- [ Get Products Count ]
    this.adminUserManagerService.GetProductsCount().subscribe({
      next: (d) => { this.totalProducts = d },
      error: (error) => { console.log('error' + error) },
      complete: () => { },
    });

    // ---------------- [ Get Orders Count ]
    this.adminUserManagerService.GetOrdersCount().subscribe({
      next: (d) => { this.totalOrders = d },
      error: (error) => { console.log('error' + error) },
      complete: () => { },
    });

    // ---------------- [ Get Total Sell ]
    this.adminUserManagerService.GetTotalSell().subscribe({
      next: (d) => { this.totalSell = d },
      error: (error) => { console.log('error' + error) },
      complete: () => { },
    });




  }


}
