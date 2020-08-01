import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../model/iuser';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.URL + '/api';

  constructor(private http: HttpClient) { }

  registerGuest(user: Partial<IUser>): Observable<any> {
    return this.http.post<any>(this.API_URL + '/signUp', user);
  }

  registerHost(user: Partial<IUser>): Observable<any> {
    return this.http.post<any>(this.API_URL + '/host/signUp', user);
  }
}
