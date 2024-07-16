import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users!: User[];
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    return this.authService.getAll().subscribe(data=>{
      this.users = data as User[];
      console.log(this.users);
    })
  }

  deleteUser(id: string){
    var result = confirm('Bạn có muốn xóa?');
    if(result){
      this.authService.delete(id).subscribe(data=>{
        console.log(data);
        this.router.navigate(['/user-list'])
        .then(()=>{
          window.location.reload();
        })
      })
    }
  }

}
