import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../model/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private API_URL = environment.URL + '/api/user';

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.API_URL);
  }

  updateUser(user: Partial<IUser>): Observable<any> {
    return this.http.put<any>(`${this.API_URL + '/updateCurrent'}`, user);
  }

  getUserCurrent(): Observable<any> {
    return this.http.get<any>(`${this.API_URL + '/Current'}`);
  }

  confirmPasswordUser(password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL + '/confirmPassword'}`, password);
  }
}
