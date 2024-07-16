import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
  categories!: Category[];

  constructor(private productService: ProductService, private categoryService: CategoryService,  private router: Router) {
    this.product = new Product();

    this.productForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'price': new FormControl('', [Validators.required]),
      'image': new FormControl('', [Validators.required]),
      'desc': new FormControl('', [Validators.required, Validators.minLength(9)]),
      'category': new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(data=>{
      this.categories = data as Category[];
    });
  }


  onSubmit(){
    if(this.productForm.invalid){
      alert('Vui lòng nhập hợp lệ');
      return console.log('Không hợp lệ');
    } else {
      this.productService.save(this.product).subscribe(data=>{
        console.log(data);
        this.router.navigate(['/product-list'])
      });
    }
  }
}
