import {Component, OnInit} from '@angular/core';
import {IHouse} from '../../../model/ihouse';
import {OrderHouse} from '../../../model/order-house';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IComment} from '../../../model/icomment';
import {IRate} from '../../../model/irate';
import {HouseService} from '../../../services/house.service';
import {CommentService} from '../../../services/comment.service';
import {RateService} from '../../../services/rate.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

// tslint:disable-next-line:typedef
declare function convertStringToArray(str);

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
  house: IHouse = {
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
  orderHouse = new OrderHouse();
  formOrder: FormGroup;

  time: Date = new Date();

  comments: IComment[] = [];
  comment: Partial<IComment> = {
    comment: '',
    house: {
      id: 0,
      houseName: '',
      category: '',
      address: '',
      bedroomNumber: 0,
      bathroomNumber: 0,
      price: 0,
      description: '',
      imageUrls: [],
      orderHouses: [],
      rate: 0,
      area: 0,
    }
  };
  rates: IRate[] = [];
  rate: Partial<IRate> = {
    ratePoint: 0,
    house: {
      id: 0,
      houseName: '',
      category: '',
      address: '',
      bedroomNumber: 0,
      bathroomNumber: 0,
      price: 0,
      description: '',
      imageUrls: [],
      orderHouses: [],
      rate: 0,
      area: 0,
    }
  };

  rateChecked: number;

  isGuest: boolean;

  rateGuest = 0;
  id: number;


  checkGuest(roles: string[]): boolean {
    for (const role of roles) {
      if (role === 'ROLE_GUEST') {
        return true;
      }
    }
    return false;
  }

  constructor(private houseService: HouseService,
              private commentService: CommentService,
              private rateService: RateService,
              private auth: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
    this.formOrder = new FormGroup({
      checkin: new FormControl('', [Validators.required]),
      checkout: new FormControl('', [Validators.required]),
      numberGuest: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      this.houseService.getHouseById(this.id)
        .subscribe(
          next => {
            this.house = next.data;
          },
          error => {
            this.house = null;
          });
      this.rateService.getRatesByHouseId(this.id).subscribe(data => {
          this.rates = data.data;
          this.rateChecked = this.rateService.checkRates(this.rates);
        });
      this.commentService.getCommentsByHouseId(this.id).subscribe(next => {
          this.comments = next.data;
        },
        error => {
          this.comments = null;
        });

      if (this.auth.isLoggedIn()) {
        const roles = convertStringToArray(localStorage.getItem('roles'));
        this.isGuest = this.checkGuest(roles);
      }
      if (this.isGuest) {
        this.rateService.getRateByUserIdAndHouseId(this.id).subscribe(next => {
          this.rateGuest = next.data.ratePoint;
        });
      }
    });
  }

  getNumberDay() {
    let numberDay;
    if (this.orderHouse.checkin && this.orderHouse.checkout) {
      const day = 86400 * 1000;
      const checkout = new Date(this.orderHouse.checkout);
      const checkin = new Date(this.orderHouse.checkin);
      numberDay = (checkout.getTime() - checkin.getTime()) / day;
    } else {
      numberDay = 1;
    }
    return numberDay;
  }

  sendOrder() {
    if (this.formOrder.valid) {
      this.houseService.order = this.formOrder.value;
      this.router.navigateByUrl(`houses/${this.id}/booking`);
    } else {
      alert('Bạn chưa điền đủ thông tin đặt nhà');
    }
  }

  createComment() {
    this.comment.house = this.house;
    this.commentService.createComment(this.comment).subscribe(next => {
      this.commentService.getCommentsByHouseId(this.id).subscribe(next1 => {
          this.comments = next1.data;
        },
        error => {
          this.comments = null;
        });
      this.comment = {
        comment: '',
        house: {
          id: 0,
          houseName: '',
          category: '',
          address: '',
          bedroomNumber: 0,
          bathroomNumber: 0,
          price: 0,
          description: '',
          imageUrls: [],
          orderHouses: [],
          rate: 0,
          area: 0,
        }
      };
    });
  }

  createRate(i: number) {
    console.log(i);
    this.rate.house = this.house;
    this.rate.ratePoint = i;
    this.rateService.createRate(this.rate).subscribe(next => {
        alert(next.message);
        this.rateService.getRatesByHouseId(this.id).subscribe(data => {
            this.rates = data.data;
            this.rateChecked = this.rateService.checkRates(this.rates);
          });
      }
    );
  }

  myFilter = (d: Date): boolean => {
    const day = d.getTime();
    const now = new Date().getTime();
    return day > now;
  }
}
