import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ibrandadd } from 'src/app/Interfaces/brand/ibrandadd';
import { Ibrandreturn } from 'src/app/Interfaces/brand/ibrandreturn';
import { BrandService } from 'src/app/Services/dashboard/brand.service';

@Component({
  selector: 'app-brand-list-dashboard',
  templateUrl: './brand-list-dashboard.component.html',
  styleUrls: ['./brand-list-dashboard.component.css']
})
export class BrandListDashboardComponent {

  brands:Ibrandreturn[] = [];

  // ---------------- [ Add Variables ]
  fg !:FormGroup;

  brandAdd : Ibrandadd = {
    name : ''
  }

  // ---------------- [ Edit Variables ]
  brandEdit : Ibrandreturn={
    id:0,
    name : ''
  }
  brandId:number = 0;


  constructor(private fb:FormBuilder ,private brandService:BrandService ,private router:Router ){}

  ngOnInit(): void {

    this.fg = this.fb.group({
      name:['',[Validators.required, Validators.minLength(2)]]
    });

    // ---------------- [ Get All Brands ]
    this.brandService.getAll().subscribe({
      next:(data) =>{this.brands= data},
      error:(error)=>{console.log('error'+error)},
      complete: ()=>{},
    });

  }

// ------------------------------------------ [ Add | Edit brand  ] ----------------------------------------
  // ---------------- [OnSubmit Form  ]
  OnSubmit(e :Event){
    e.preventDefault();

    if (this.fg.valid)
    {
      if(this.brandId < 1) //add
      {
        this.brandAdd.name = this.fg.get('name')?.value;

          this.brandService.add(this.brandAdd).subscribe(
            {
              next:     () => this.closeForm(),
              error:    (e) => console.log(e),
              complete: () => {
                console.log("Brand Added Successfully!")
                this.brandService.getAll().subscribe({
                  next: (d) => this.brands = d
                })
                this.fg.reset();
              }
            })
      }
      else // edit
      {
        this.brandEdit.id = this.brandId ;
        this.brandEdit.name = this.fg.get('name')?.value;
        console.log(this.brandEdit);
        this.brandService.edit(this.brandEdit).subscribe(
          {
            next:     () => this.closeForm(),
            error:    (e) => console.log(e),
            complete: () => {
              console.log("Brand Edited Successfully!")
              this.brandService.getAll().subscribe({
                next: (d) => this.brands = d
              })
              this.brandId = 0;
              this.fg.reset();
            }
          })
      }

    }

  }

  // ---------------- [OPEN Brand Form ]
  openForm(id:number) {

    if(id > 0)//edit
    {
      this.brandId=id ;
        this.brandService.getById(this.brandId).subscribe(
          {
            next:(d) => {
              this.brandEdit = d ;
              // ---------------- [declare edit form group  ]
              this.fg= this.fb.group({
                name:[this.brandEdit.name,[Validators.required, Validators.minLength(2)]]
              });
            },
            error:    (e) => console.log(e),
            complete: () => console.log("got brand data to edit it successfully!")
          });
    }
    const overlay = document.getElementById('overlay');
    if (overlay) {
      overlay.style.display = 'block';
    }
  }

    // ---------------- [Close Brand Form ]
  closeForm() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  }



 // ---------------- [Delete Brand ]
  delete(id:number){
  this.brands = this.brands.filter(b => b.id !== id);
  this.brandService.delete(id).subscribe(() => {
  });
}


  // ---------------- [ name  ]
  get nameRequired():boolean|void{return this.fg.get('name')?.hasError('required');}
  get nameValid(): boolean|void { return this.fg.get('name')?.valid;}
  get nameTouched():boolean|void{ return this.fg.get('name')?.touched;}

}
