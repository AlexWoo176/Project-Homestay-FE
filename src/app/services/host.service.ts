import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IHouse} from '../model/ihouse';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ImageOfHouse} from '../model/image-of-house';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HostService {
  houses: IHouse[];
  imageUrls: string[] = [];
  private API_URL = environment.URL + '/api/host/houses';

  constructor(private http: HttpClient) {
  }

  getHouses(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  createHouse(imageOfHouses: ImageOfHouse[]): Observable<any> {
    return this.http.post<any>(this.API_URL, JSON.stringify(imageOfHouses), httpOptions);
  }

  updateHouse(house: IHouse): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${house.id}`, house);
  }

  deleteHouse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
}
