import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private API_URL = environment.URL + '/api/me/orders';

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  getHouseOfOrder(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + `/${id}` + '/house-of-order');
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + `/${id}` + '/delete');
  }

  getHouseOrderByUser(id: number): Observable<any> {
    return this.http.get<any>(`${environment.URL + '/api/host/house/orderOfUser'}/${id}`);
  }

  getListHouseOfHost(): Observable<any> {
    return this.http.get<any>(`${environment.URL + '/api/host/houses'}`);
  }
}
