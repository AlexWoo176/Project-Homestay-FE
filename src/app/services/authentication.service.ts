import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private API_URL = environment.URL + '/api/login';

  constructor(private http: HttpClient) { }

  authenticate(user): Observable<any> {
    return this.http.post<any>(this.API_URL, user);
  }

  isLoggedIn() {
    const username = localStorage.getItem('currentUser');
    return !(username === null);
  }

  logout() {
    localStorage.clear();
  }
}
