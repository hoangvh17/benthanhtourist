import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: any;
  isAdmin: any;

  categories!: Category[];
  constructor(private auth: AuthService, private categoryService: CategoryService) {
    this.isLogin = this.auth.checkLogin();
    this.isAdmin = this.auth.checkAdmin();

  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(data=>{
      this.categories = data as Category[];
    })
  }

  onLogout(){
    localStorage.clear();
    location.assign('/');
  }

}
