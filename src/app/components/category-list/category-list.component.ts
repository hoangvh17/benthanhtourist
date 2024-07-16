import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories!: Category[];
  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    return this.categoryService.getAll().subscribe(data=>{
      this.categories = data as Category[];
      console.log(this.categories);
    });
  }

  deleteCategory(id: string){
    var result = confirm('Want to delete?');
    if(result){
      this.categoryService.delete(id).subscribe(data=>{
        console.log(data);
        this.router.navigate(['/category-list'])
        .then(() => {
          window.location.reload();
        });
      })
    }
  }
}
