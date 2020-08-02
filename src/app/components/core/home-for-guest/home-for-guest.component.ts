import { Component, OnInit } from '@angular/core';
import {OrderHouse} from '../../../model/order-house';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-home-for-guest',
  templateUrl: './home-for-guest.component.html',
  styleUrls: ['./home-for-guest.component.css']
})
export class HomeForGuestComponent implements OnInit {

  orders: OrderHouse[];
  day = 86400 * 1000;
  now: Date;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      next => {
        this.orders = next.data;
        for (const order of this.orders) {
          order.checkin = new Date(order.checkin);
          order.checkout = new Date(order.checkout);
          this.now = new Date();
          this.orderService.getHouseOfOrder(order.id).subscribe(
            next2 => order.house = next2.data
          );
        }
      }
    );
  }

  cancelOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe(
      next => {
        if (next.success) {
          alert(next.message);
          this.orderService.getOrders().subscribe(
            next1 => {
              this.orders = next1.data;
              for (const order of this.orders) {
                order.checkin = new Date(order.checkin);
                order.checkout = new Date(order.checkout);
                this.now = new Date();
                this.orderService.getHouseOfOrder(order.id).subscribe(
                  next2 => order.house = next2.data
                );
              }
            }
          );
        } else {
          alert(next.message);
        }
      },
    );
  }

}
