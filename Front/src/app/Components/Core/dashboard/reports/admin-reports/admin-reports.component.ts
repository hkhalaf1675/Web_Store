import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { Ireport } from 'src/app/Interfaces/ireport';
import { OrderStatus } from 'src/app/Interfaces/order/order-status';
import { ReporstService } from 'src/app/Services/dashboard/reporst.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent {

  reports: Ireport[] = [];
  startDate!: Date;
  endDate!: Date;
  reportForm!: FormGroup;
  showDialog = false;

  constructor(private reportService: ReporstService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.reportForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.reportForm.valid) {
      this.startDate = this.reportForm.value.startDate;
      this.endDate = this.reportForm.value.endDate;

      this.reportService.GetAllOrders(this.startDate, this.endDate).subscribe((data) => {this.reports = data;});
        

        // ---------------- [ Close the dialog after submitting ]
        this.showDialog = false;
    }
  }

  // ---------------- [ get Order Status Name ]
  getOrderStatusName(status: number): string {
    return OrderStatus[status];
  }
  

}
