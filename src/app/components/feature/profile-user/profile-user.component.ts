import {Component, OnInit} from '@angular/core';
import {IUser} from '../../../model/iuser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserProfileService} from '../../../services/user-profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  username: string;
  user: Partial<IUser>;
  oldPassword: string;
  status: string;
  loginForm: FormGroup;

  constructor(
    private userProfileService: UserProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService
  ) {
    this.user = {
      username: '',
      email: ''
    };
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('currentUser');
    this.userProfileService.getUserCurrent().subscribe(data => {
      this.user = data;
    });
  }

  updateProfile(): void {
    this.user.password = this.oldPassword;
    this.userProfileService.confirmPasswordUser(this.oldPassword + '').subscribe(next => {
      if (next.message === 'confirm Succssess') {
        this.status = '';
        this.userProfileService.updateUser(this.user).subscribe(data => {
          alert('Ban da update thanh cong');
          this.username = data.username;
          localStorage.setItem('currentUser', data.username);
          this.loginForm = this.formBuilder.group({
            username: [data.username, Validators.required],
            password: [this.oldPassword, Validators.required]
          });
          this.auth.authenticate(this.loginForm.value).subscribe(
            next1 => {
              localStorage.setItem('token', next1.data.token);
            });
        });
        return;
      }
    });
    alert('Bạn nhập mật khẩu hiện tại không chính xác');
  }
}
