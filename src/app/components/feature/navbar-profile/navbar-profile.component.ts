import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.css']
})
export class NavbarProfileComponent implements OnInit {
  username: string;

  constructor() {
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('currentUser');
  }

  logout(): void {
    localStorage.clear();
  }
}
