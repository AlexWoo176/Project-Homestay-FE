import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

function convertStringToArray(str: string): string[] {
  let arr: string[] = [];
  const temp1 = str.replace('[', '');
  const temp2 = temp1.replace(']', '');
  const temp3 = temp2.replace('"', '');
  const temp4 = temp3.replace('"', '');
  const temp5 = temp4.replace('"', '');
  const temp6 = temp5.replace('"', '');
  const temp7 = temp6.replace(' ', '');
  arr = temp7.split(',');
  return arr;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  redirectURL: string;

  constructor(
    private fb: FormBuilder,
    public auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.auth.authenticate(this.loginForm.value).subscribe(
      next => {
        if (next.success) {
          const roles: string[] = [];
          for (const role of next.data.roles) {
            roles.push(role.authority);
          }
          localStorage.setItem('token', next.data.token);
          localStorage.setItem('currentUser', next.data.username);
          localStorage.setItem('roles', JSON.stringify(roles));
          const params = this.route.snapshot.queryParams;
          if (params.redirectURL) {
            this.redirectURL = params.redirectURL;
          }
          if (this.redirectURL) {
            this.router.navigateByUrl(this.redirectURL)
              .catch(() => this.router.navigate(['houses']));
          } else {
            this.router.navigate(['houses']);
          }
        } else {
          alert(next.message);
        }
      },
      error1 => {
        this.router.navigateByUrl('/login');
      });
  }
}
