import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products! : Product[];
  keyword!: string;

  constructor(private productService: ProductService, private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
    return this.productService.getProductDisplay().subscribe(data=>{
      this.products = (data as Product[]).slice(0,6);
      console.log(this.products);

    })
  }

  onSearch(){
    this.router.navigate(['/products'], {queryParams: {keyword: this.keyword}})
  }

}
