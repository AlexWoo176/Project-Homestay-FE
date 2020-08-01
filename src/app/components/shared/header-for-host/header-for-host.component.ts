import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-for-host',
  templateUrl: './header-for-host.component.html',
  styleUrls: ['./header-for-host.component.css']
})
export class HeaderForHostComponent implements OnInit {
  username: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('currentUser');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
