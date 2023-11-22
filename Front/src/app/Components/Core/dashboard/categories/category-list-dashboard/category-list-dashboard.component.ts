import { NotExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Icategoryreturn } from 'src/app/Interfaces/category/icategoryreturn';
import { CategoryService } from 'src/app/Services/dashboard/category.service';

@Component({
  selector: 'app-category-list-dashboard',
  templateUrl: './category-list-dashboard.component.html',
  styleUrls: ['./category-list-dashboard.component.css']
})
export class CategoryListDashboardComponent {

  cats: Icategoryreturn[] = [];
  fg !: FormGroup;
  category: Icategoryreturn = {
    id: 0,
    name: ''
  }
  catId: number = 0;


  constructor(private catService: CategoryService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    // ---------------- [ Get All Categories ]
    this.catService.getAll().subscribe({
      next: (data) => { this.cats = data },
      error: (error) => { console.log('error' + error) },
      complete: () => { },
    });

    this.fg = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });

  }

  // ------------------------------------------ [ Add | Edit Category  ] ----------------------------------------

  // ---------------- [OnSubmit Form  ]
  OnSubmit(e: Event) {
    e.preventDefault();

    if (this.fg.valid) {
      if (this.catId < 1) //add
      {
        this.category.name = this.fg.get('name')?.value;
        this.category.id =0;
        this.catService.add(this.category).subscribe(
          {
            next: () => this.closeForm(),
            error: (e) => console.log(e),
            complete: () => {
              console.log("Category Added Successfully!")
              this.catService.getAll().subscribe(
                {
                  next: (d) => this.cats = d
                }
              )
              this.catId = 0;
              this.fg.reset();
            }
          })
      }
      else // edit
      {
        this.category.id = this.catId;
        this.category.name = this.fg.get('name')?.value;
        this.catService.edit(this.category).subscribe(
          {
            next: () => this.closeForm(),
            error: (e) => console.log(e),
            complete: () => {
              console.log("Category Edited Successfully!")
              this.catService.getAll().subscribe(
                {
                  next: (d) => this.cats = d
                }
              )
              this.catId = 0;
              this.fg.reset();
            }
          })
      }


    }

  }

  // ---------------- [OPEN Category Form ]
  openForm(id: number) {

    if (id > 0)//edit
    {
      this.catId = id;
      this.catService.getById(this.catId).subscribe(
        {
          next: (d) => {
            this.category = d;
            // ---------------- [declare edit form group  ]
            this.fg = this.fb.group({
              name: [this.category.name, [Validators.required, Validators.minLength(2)]]
            });
          },
          error: (e) => console.log(e),
          complete: () => console.log("got Category data to edit it successfully!")
        });
    }
    const overlay = document.getElementById('overlay');
    if (overlay) {
      overlay.style.display = 'block';
    }
  }

  // ---------------- [Close Category Form ]
  closeForm() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  }


  delete(id: number) {
    this.cats = this.cats.filter(c => c.id !== id);
    this.catService.delete(id).subscribe(() => {
    });
  }


  // ---------------- [ name  ]
  get nameRequired(): boolean | void { return this.fg.get('name')?.hasError('required'); }
  get nameValid(): boolean | void { return this.fg.get('name')?.valid; }
  get nameTouched(): boolean | void { return this.fg.get('name')?.touched; }

}
