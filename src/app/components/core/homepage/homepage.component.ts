import {Component, OnInit} from '@angular/core';
import {IHouse} from '../../../model/ihouse';
import {HouseService} from '../../../services/house.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  bestChoiceHouses: IHouse[];

  constructor(private houseService: HouseService) {
  }

  ngOnInit(): void {
    this.houseService.getHouses()
      .subscribe(next => {
        this.bestChoiceHouses = next.data;
      });
  }
}
