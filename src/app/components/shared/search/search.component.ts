import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IHouse} from '../../../model/ihouse';
import {FormControl, FormGroup} from '@angular/forms';
import {HouseService} from '../../../services/house.service';
import {OrderHouse} from '../../../model/order-house';
import {FilterRequest} from '../../../model/filter-request';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  houses: IHouse[];
  filteredHouses: IHouse[];
  searchForm: FormGroup;
  @Output()
  press = new EventEmitter<IHouse[]>();
  addresses: string[] = [];

  constructor(
    private houseService: HouseService
  ) {
    this.searchForm = new FormGroup({
      address: new FormControl(''),
      bedroomNumber: new FormControl(''),
      bathroomNumber: new FormControl(''),
      minPrice: new FormControl(''),
      maxPrice: new FormControl(''),
      checkin: new FormControl(''),
      checkout: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.houseService.getHouses()
      .subscribe(next => {
        this.houses = next.data;
        for (const house of this.houses) {
          this.addresses.push(house.address);
          for (const order of house.orderHouses) {
            order.checkin = new Date(order.checkin);
            order.checkout = new Date(order.checkout);
          }
        }
        this.addresses = this.addresses.filter((value, i, self) => self.indexOf(value) === i);
      });
  }

  filter(): void {
    if (this.searchForm.valid) {
      const form = this.searchForm.value;
      const isEmptyForm = !form.address && !form.bedroomNumber && !form.bathroomNumber
        && !form.minPrice && !form.maxPrice && !form.checkin && !form.checkout;
      this.filteredHouses = this.houses;
      if (!isEmptyForm) {
        if (form.address) {
          this.filteredHouses = this.filteredHouses.filter((house => house.address === form.address));
        }
        if (form.bedroomNumber) {
          this.filteredHouses = this.filteredHouses.filter((house => house.bedroomNumber === +form.bedroomNumber));
        }
        if (form.bathroomNumber) {
          this.filteredHouses = this.filteredHouses.filter((house => house.bathroomNumber === +form.bathroomNumber));
        }
        if (form.minPrice) {
          this.filteredHouses = this.filteredHouses.filter((house => house.price >= +form.minPrice));
        }
        if (form.maxPrice) {
          this.filteredHouses = this.filteredHouses.filter((house => house.price <= +form.maxPrice));
        }
        if (form.checkin || form.checkout) {
          const checkin = new Date(form.checkin);
          const checkout = new Date(form.checkout);
          this.filteredHouses = this.filteredHouses.filter(house => !this.checkOrderedHouse(house.orderHouses, checkin, checkout));
        }
      } else {
        this.filteredHouses = this.houses;
      }
      this.press.emit(this.filteredHouses);
    }
  }

  checkOrderedHouse(orderHouses: OrderHouse[], checkin: Date, checkout: Date): boolean {
    for (const order of orderHouses) {
      const isOrdered = (checkin.getTime() >= order.checkin.getTime() && checkin.getTime() <= order.checkout.getTime()) ||
        (checkout.getTime() <= order.checkout.getTime() && checkout.getTime() >= order.checkin.getTime());
      if (isOrdered) {
        return true;
      }
    }
    return false;
  }

  unFilter(): void {
    const filterEmpty = new FilterRequest();
    filterEmpty.address = '';
    filterEmpty.bathroomNumber = '';
    filterEmpty.bedroomNumber = '';
    filterEmpty.minPrice = '';
    filterEmpty.maxPrice = '';
    filterEmpty.checkin = null;
    filterEmpty.checkout = null;
    this.searchForm.patchValue(filterEmpty);
    this.filter();
  }
}
