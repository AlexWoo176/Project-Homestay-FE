import {Component, OnInit} from '@angular/core';
import {IHouse} from '../../../model/ihouse';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-list-house-of-host',
  templateUrl: './list-house-of-host.component.html',
  styleUrls: ['./list-house-of-host.component.css']
})
export class ListHouseOfHostComponent implements OnInit {

  listHouseOfHost: IHouse[];

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.getListHouseOfHost().subscribe(data => {
      this.listHouseOfHost = data.data;
    });
  }

}
