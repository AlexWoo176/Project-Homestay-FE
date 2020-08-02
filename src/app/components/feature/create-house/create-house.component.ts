import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IHouse} from '../../../model/ihouse';
import {Router} from '@angular/router';
import {HostService} from '../../../services/host.service';
import {ImageOfHouse} from '../../../model/image-of-house';

@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.css']
})
export class CreateHouseComponent implements OnInit {
  houseForm: FormGroup;
  house: Partial<IHouse>;
  defaultHouseImage = 'https://www.sanmonjizen.org/images/assets/home.gif';
  imageUrls: string[] = [];

  constructor(private router: Router,
              private hostService: HostService) {
    this.houseForm = new FormGroup({
      houseName: new FormControl('',
        [Validators.required, Validators.minLength(3),
          Validators.maxLength(100), Validators.pattern(/^[_A-z0-9]*[_A-z0-9]*$/)]),
      category: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      bedroomNumber: new FormControl('', [Validators.min(0), Validators.required]),
      bathroomNumber: new FormControl('', [Validators.min(0), Validators.required]),
      price: new FormControl('', [Validators.min(0), Validators.required]),
      description: new FormControl(''),
      area: new FormControl('', [Validators.min(0), Validators.required])
    });
    const typeName = 'Home';
    this.house = {
      houseName: '',
      category: '',
      address: '',
      bedroomNumber: 0,
      bathroomNumber: 0,
      price: 0,
      description: '',
      rate: 0,
      area: 0
    };
  }

  ngOnInit(): void {
  }

  createHouse(): void {
    if (this.houseForm.valid) {
      const imageHouses: ImageOfHouse[] = [];
      if (!this.imageUrls.length) {
        this.imageUrls.push(this.defaultHouseImage);
      }
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.imageUrls.length; i++) {
        const imageHouse = new ImageOfHouse();
        imageHouse.imageUrl = this.imageUrls[i];
        imageHouse.house = this.house;
        imageHouses.push(imageHouse);
      }
      this.hostService.createHouse(imageHouses).subscribe(next => {
        this.router.navigateByUrl('/home-for-host/houses');
        alert('Đăng nhà thành công');
      });
    } else {
      alert('Thông tin nhà chưa đủ hoặc không hợp lệ. Vui lòng kiểm tra lại.');
    }
  }

  redirect(): void {
    this.router.navigateByUrl('/home-for-host');
  }

  getImageUrls(imageUrls: string[]) {
    this.imageUrls = imageUrls;
  }
}
