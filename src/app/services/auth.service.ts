import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'

import { User } from '../models/user';
import { errorHandler } from '../helpers/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = `https://finalproject-payment.herokuapp.com/api/authmanagement`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  jwtToken: string = ''
  jwtRefreshToken: string = ''
  constructor(private http: HttpClient) { }
  get isAuthenticated() {
    return !!this.getAuthorizationToken()
  }

  getAuthorizationToken() {
    return localStorage.getItem('app_token')
  }

  setAuthorizationToken(token: string, refreshToken: string) {
    localStorage.setItem('refresh_token', refreshToken);
    return localStorage.setItem('app_token', token);
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token')
  }

  signUp(user: User): Observable<any> {
    const api = `${this.endpoint}/register`;

    return this.http
    .post(api, user)
    .pipe( catchError(errorHandler) )
  }

  signIn(user: User): Observable<any> {
    const api = `${this.endpoint}/Login`;

    return this.http
    .post(api, user)
    .pipe( catchError(errorHandler) )
  }

  refreshToken() { 
    const token = this.getAuthorizationToken(); 
    const refreshToken = this.getRefreshToken(); 
    return this.http .post(`${this.endpoint}/refreshtoken`, 
    { token, refreshToken }) 
    .pipe(catchError(errorHandler)); 
  }

  
}
