import {Component, OnInit} from '@angular/core';
import {IUser} from '../../../model/iuser';
import {Router} from '@angular/router';
import {UserProfileService} from '../../../services/user-profile.service';

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
  console.log(arr);
  return arr;
}

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  username: string;
  user: IUser;
  roles: string[] = [];

  constructor(
    private router: Router,
    private userProfile: UserProfileService
  ) {
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('currentUser');
    if (this.username) {
      this.userProfile.getUserCurrent().subscribe(
        next => this.user = next,
      );
    }
    this.roles = convertStringToArray(localStorage.getItem('roles'));
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
