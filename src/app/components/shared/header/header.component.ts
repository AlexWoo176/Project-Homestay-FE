import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('currentUser');
  }

}
