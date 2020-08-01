import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../../../model/iuser';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

// tslint:disable-next-line:typedef
function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordNotMatch: true
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: Partial<IUser>;
  avatarDefault = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRTUteh9yefJkzgW2Pa1jEMEs8YKY5cfat09zZZdeyX-V-Vhpe';
  success: boolean;
  message: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
        confirmPassword: ['']
      }, {validator: comparePassword}),
      address: [''],
      age: [''],
      type: [''],
      phone: [''],
      role: [''],
      name: [''],
      idNumber: [''],
      avatar: [''],
      username: ['', [Validators.required, Validators.minLength(3),
        Validators.maxLength(50), Validators.pattern(/^[_A-z0-9]*[_A-z0-9]*$/)]],
    });

    this.user = {
      id: Math.round(Math.random() * 1000),
      username: '',
      password: '',
      name: 'user',
      email: '',
      avatar: this.avatarDefault
    };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.userService.registerGuest(this.user).subscribe(
        next => {
          this.success = next.success;
          this.message = next.message;
          alert('Đăng ký tài khoản thành công');
          this.router.navigateByUrl('/login');
        }
      );
    }
  }

  // tslint:disable-next-line:typedef
  getImageUrl(imageUrls: string[]) {
    this.user.avatar = imageUrls[0];
  }

}
