import {Component, OnInit} from '@angular/core';
import {IHouse} from '../../../model/ihouse';
import {HouseService} from '../../../services/house.service';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-list-house',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.css']
})
export class ListHouseComponent implements OnInit {
  bestChoiceHouses: IHouse[] = [];
  bestSaleOffHouses = this.bestChoiceHouses;
  suggestionHouses = this.bestChoiceHouses;

  constructor(
    private houseService: HouseService,
    private auth: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.houseService.getHouses()
      .subscribe(next => {
        this.bestChoiceHouses = next.data;
      });
  }

  update(houses: IHouse[]) {
    this.bestChoiceHouses = houses;
  }

}
