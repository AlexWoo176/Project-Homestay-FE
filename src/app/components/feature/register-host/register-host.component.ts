import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../../../model/iuser';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';

// tslint:disable-next-line:typedef
function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-register-host',
  templateUrl: './register-host.component.html',
  styleUrls: ['./register-host.component.css']
})
export class RegisterHostComponent implements OnInit {
  registerForm: FormGroup;
  user: Partial<IUser>;
  avatarDefault = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRTUteh9yefJkzgW2Pa1jEMEs8YKY5cfat09zZZdeyX-V-Vhpe';

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['']
      }, {validator: comparePassword}),
      avatar: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3),
        Validators.maxLength(50), Validators.pattern(/^[_A-z0-9]*[_A-z0-9]*$/)]],
    });

    this.user = {
      username: '',
      password: '',
      name: 'HOST',
      email: '',
      avatar: this.avatarDefault
    };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.userService.registerHost(this.user)
        .subscribe(
          data => {
            this.router.navigateByUrl('/login');
          }
        );
    } else {
      alert('Thông tin không hợp lệ');
    }

  }

  getImageUrl(imageUrls: string[]) {
    this.user.avatar = imageUrls[0];
  }
}
