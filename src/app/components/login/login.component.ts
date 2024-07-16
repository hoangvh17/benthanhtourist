import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  constructor(private authservice: AuthService) {
    this.user = new User();
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
     });

  }

  ngOnInit() {
  }

  onLogin(){
    if(this.loginForm.invalid){
      alert('Vui lòng nhập hợp lệ')
      return console.log('Không hợp lệ');
    }

    this.authservice.login(this.loginForm.value).subscribe(
      (res: any)=>{
        console.log(res);
        alert('Đăng nhập thành công');
        let jsonData = JSON.stringify(res);
        localStorage.setItem('login', jsonData);
        location.assign('/');
      },
      (error: any) =>{
        console.log(error);
        console.log('Sai tên đăng nhập hoặc mật khẩu');
        alert('Sai tên đăng nhập hoặc mật khẩu');
      }
    )
  }


}
