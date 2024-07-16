  import { HttpClient } from '@angular/common/http';
  import { Component, OnInit } from '@angular/core';
  import { FormGroup, FormControl, Validators } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { Category } from 'src/app/models/category';
  import { Product } from 'src/app/models/product';
  import { CategoryService } from 'src/app/services/category.service';
  import { ProductService } from 'src/app/services/product.service';

  @Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
  })
  export class ProductEditComponent implements OnInit {
    productForm: FormGroup;
    product!: Product;
    categories!: Category[];
    id: string;
    constructor(private httpClient: HttpClient,
      private route: ActivatedRoute,
      private productService: ProductService,
      private categoryService: CategoryService,
      private router: Router) {
        this.id = route.snapshot.params['id'];
        console.log(`id is ${this.id}`);
        this.productForm = new FormGroup({
          '_id': new FormControl(null, Validators.required),
          'name': new FormControl(null, [Validators.required, Validators.minLength(6)]),
          'price': new FormControl(null, [Validators.required]),
          'image': new FormControl(null, [Validators.required]),
          'desc': new FormControl(null, [Validators.required, Validators.minLength(9)]),
          'category': new FormControl(null, Validators.required),
        })

      }

    ngOnInit() {
      this.productService.get(this.id).subscribe(data=>{
        this.product = data as Product;
        this.productForm.patchValue(this.product);
      });
      this.categoryService.getAll().subscribe(data=>{
        this.categories = data as Category[];
      });
    }

    onSubmit(){
      if(this.productForm.invalid){
        alert('Vui lòng nhập hợp lệ');
        return console.log('Không hợp lệ');
      } else {
        const updatedProduct = this.productForm.value;
        this.productService.update(this.id, updatedProduct ).subscribe(data=>{
          console.log(data);
          this.router.navigate(['/product-list']);
        })
      }
    }
  }
