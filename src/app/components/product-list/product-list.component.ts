import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];

  constructor(private productService: ProductService,  private router: Router, private auth: AuthService) { }

  ngOnInit() {
    return this.productService.getAll().subscribe(data=>{
      this.products = data as Product[];
      console.log(data);

    }, (error: any)=>{
      console.log(error);
      if(error && error.status === 401){
        try {
          const refreshtoken = this.auth.getRefreshToken();
          console.log(refreshtoken);
          if(!refreshtoken){
            this.router.navigate(['/login']);
            return;
          }


          this.auth.refreshToken({'refreshToken' : refreshtoken}).subscribe((res:any)=>{
            console.log(res);

            let jsonData = JSON.stringify(res);
            localStorage.setItem('login', jsonData);

            this.productService.getAll().subscribe(data=>{
              this.products = data as Product[];
            })
          })
        } catch (refreshtoken) {
          console.log(' lỗi refresh token', refreshtoken);
        }
      }  return false;

    })
  }

  deleteProduct(id: string){
    var result = confirm('Want to delete?');
    if(result){
      this.productService.delete(id).subscribe(data=>{
        console.log(data);
        this.router.navigate(['/product-list'])
        .then(() => {
          window.location.reload();
        });
      })
    }
  }

}
