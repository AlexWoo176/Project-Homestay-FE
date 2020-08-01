import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IHouse} from '../model/ihouse';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {FilterRequest} from '../model/filter-request';
import {OrderHouse} from '../model/order-house';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  houses: IHouse[];
  order: any;
  imageUrls: string[] = [];
  private API_URL = environment.URL + '/api/houses';

  constructor(private http: HttpClient) { }

  getHouses(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  filterHouse(filterRequest: FilterRequest): Observable<any> {
    return this.http.post<any>(this.API_URL + '/filter', filterRequest);
  }

  getHouseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  bookingHouse(orderHouse: OrderHouse, id: number): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/${id}/booking`, JSON.stringify(orderHouse), httpOptions);
  }
}
