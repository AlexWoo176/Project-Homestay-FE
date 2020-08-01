import {Component, OnInit} from '@angular/core';
import {IHouse} from '../../../model/ihouse';
import {HostService} from '../../../services/host.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-house-host',
  templateUrl: './list-house-host.component.html',
  styleUrls: ['./list-house-host.component.css']
})
export class ListHouseHostComponent implements OnInit {
  houses: IHouse[];

  constructor(private hostService: HostService,
              private router: Router) {
  }

  ngOnInit() {
    this.hostService.getHouses().subscribe(
      next => this.houses = next.data,
      error => {
        if (error.status === 401) {
          alert('Bạn chưa đăng nhập');
          this.router.navigateByUrl('/login');
        }
      });
  }

}
