// import { Component, OnInit } from '@angular/core';
// import { Product } from '../../models/product';
// import { ProductService } from 'src/app/services/product.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {
//   products!: Product[];
//   keyword!: string;
//   private subscription!: Subscription
//   constructor(private productservice: ProductService, private router: Router, private route: ActivatedRoute) { }


//   onSearch(){
//     this.router.navigate(['/products'], {queryParams: {keyword: this.keyword}})
//   }


//   ngOnInit() {
//     this.subscription = this.route.queryParams
//       .subscribe(params=>{
//         this.productservice.getProductByQuery(params).subscribe(data=>{
//           this.products = data as Product[];
//         })
//       })
//   }

//   ngOnDestroy(){
//     if(this.subscription){
//       this.subscription.unsubscribe();
//     }
//   }

// }


import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products!: Product[];
  keyword!: string;
  sortField: string = '';
  sortOrder: string = '';
  private subscription!: Subscription;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  onSearch() {
    this.router.navigate(['/products'], {
      queryParams: {
        keyword: this.keyword,
        sortField: this.sortField,
        sortOrder: this.sortOrder
      }
    });
  }
 
  onSortFieldChange() {
    this.onSearch();
  }

  onSortOrderChange() {
    // Cập nhật sortOrder và gọi lại onSearch để gửi một truy vấn mới
    // this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.onSearch();
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'] || '';
      this.sortField = params['sortField'] || '';
      this.sortOrder = params['sortOrder'] || 'asc';
      this.productService.getProductByQuery(params).subscribe(data => {
        this.products = data as Product[];
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
