import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  productt!: Product[];

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadProduct(id);
      this.loadSuggestedProducts(id);
    });
  }

  loadProduct(id: string) {
    this.productService.get(id).subscribe(data => {
      this.product = data as Product;
    });
  }

  loadSuggestedProducts(currentProductId: string) {
    this.productService.getProductDisplay().subscribe(data => {
      this.productt = (data as Product[]).filter(product => product._id !== currentProductId).slice(0, 4);
      console.log(this.productt);
    });
  }
}
