import {Component, OnInit} from '@angular/core';
import {IStatusHouse} from '../../../model/istatus-house';
import {StatusHouseService} from '../../../services/status-house.service';
import {HouseService} from '../../../services/house.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-status-house',
  templateUrl: './edit-status-house.component.html',
  styleUrls: ['./edit-status-house.component.css']
})
export class EditStatusHouseComponent implements OnInit {
  statusHouses: IStatusHouse[];
  statusHouse: Partial<IStatusHouse>;
  houseId: number;

  constructor(private statusHouseService: StatusHouseService,
              private houseService: HouseService,
              private route: ActivatedRoute,
              private router: Router) {
    this.statusHouse = {
      house: null,
      startDate: null,
      endDate: null
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.houseId = +paramMap.get('houseId');
      this.statusHouseService.getStatusHouseByHouseId(this.houseId).subscribe(next => {
        this.statusHouses = next.data;
      });
    });
  }

  delete(id: number) {
    this.statusHouseService.deleteStatusHouse(id).subscribe(next => {
      alert(next.message);
      this.statusHouseService.getStatusHouseByHouseId(this.houseId).subscribe(data => {
        this.statusHouses = data.data;
      });
    });
  }

  create() {
    this.houseService.getHouseById(this.houseId).subscribe(next => {
      this.statusHouse.house = next.data;
      if (this.statusHouse.startDate !== null && this.statusHouse.endDate !== null) {
        this.statusHouse.startDate = new Date(this.statusHouse.startDate);
        this.statusHouse.endDate = new Date(this.statusHouse.endDate);
        this.statusHouseService.createStatusHouse(this.statusHouse).subscribe(data => {
          alert(data.message);
          this.statusHouseService.getStatusHouseByHouseId(this.houseId).subscribe(data1 => {
            this.statusHouses = data1.data;
          });
          this.statusHouse.startDate = null;
          this.statusHouse.endDate = null;
          this.statusHouseService.getStatusHouseByHouseId(this.houseId).subscribe(next1 => {
            this.statusHouses = next1.data;
          });
        });
      }
    });
  }

}
