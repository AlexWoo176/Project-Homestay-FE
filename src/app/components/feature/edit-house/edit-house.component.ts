import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IHouse} from '../../../model/ihouse';
import {IStatusHouse} from '../../../model/istatus-house';
import {HostService} from '../../../services/host.service';
import {HouseService} from '../../../services/house.service';
import {StatusHouseService} from '../../../services/status-house.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-house',
  templateUrl: './edit-house.component.html',
  styleUrls: ['./edit-house.component.css']
})
export class EditHouseComponent implements OnInit {

  houseForm: FormGroup;
  house: IHouse;
  statusHouses: IStatusHouse[];

  constructor(private hostService: HostService,
              private houseService: HouseService,
              private statusHouseService: StatusHouseService,
              private route: ActivatedRoute,
              private router: Router) {
    this.houseForm = new FormGroup({
      houseName: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      bedroomNumber: new FormControl(''),
      bathroomNumber: new FormControl(''),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
    });
    this.house = {
      id: 0,
      houseName: '',
      category: '',
      address: '',
      bedroomNumber: 0,
      bathroomNumber: 0,
      price: 0,
      description: '',
      imageUrls: [],
      rate: 0,
      area: 0,
      orderHouses: []
    };
    this.statusHouses = [];
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const id = +paramMap.get('id');
      this.houseService.getHouseById(id).subscribe(next => {
        this.house = next.data;
        // @ts-ignore
        this.house.category = this.house.category.name;
        this.statusHouseService.getStatusHouseByHouseId(this.house.id).subscribe(data => {
          if (data.data != null) {
            this.statusHouses = data.data;
          }
        });
      }, error1 => {
        this.house = null;
      });
    });
  }

  editHouse() {
    this.hostService.updateHouse(this.house).subscribe(next => {
      alert(next.message);
    });
  }

  delete(value) {
    this.statusHouseService.deleteStatusHouse(value).subscribe(next => {
      alert(next.message);
    });
  }

  redirect() {
    this.router.navigateByUrl('/home-for-host/houses');
  }

  getImageUrls(imageUrls: string[]) {
    this.house.imageUrls = imageUrls;
  }
}
