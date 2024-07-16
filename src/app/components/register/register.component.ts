import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      fullname: new FormControl('', [Validators.required, this.fullNameValidators]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rePassword: new FormControl('', Validators.required),
      admin: new FormControl(false),
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
  }

  fullNameValidators(control: FormControl): ValidationErrors | null {
    const forbiddenwords = ['ma túy', 'hàng trắng'];
    if (forbiddenwords.some(word => control.value.toLowerCase().includes(word))) {
      return { forbiddenwords: true };
    }
    return null;
  }

  passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmpassword = formGroup.get('rePassword')?.value;

    if (password !== confirmpassword) {
      return { mismatch: true };
    } else {
      return null;
    }
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      alert('Vui lòng nhập hợp  lệ');
      console.log('Không hợp lệ');
      return;
    }
    this.authService.register(this.registerForm.value).subscribe(
      (res: any) => {
        console.log(res);
        alert('Đăng ký thành công');
        location.assign('/login');
      },
      (error: any) => {
        console.error(error);
        if (error && error.error && error.error.message === 'User already exists') {
          alert('Tài khoản đã tồn tại');
        }
      }
    );
  }
}
