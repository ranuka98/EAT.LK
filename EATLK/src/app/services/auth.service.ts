import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  
  constructor(
    private http: HttpClient

  ) { }
    
  register(user:any) {
    return this.http.post("http://localhost:3000/register", user);
  }

  login(credentials:any) {
    return this.http.post("http://localhost:3000/authenticate", credentials);
  }

  getProfile() {
    let headers:any = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/profile', {headers: headers});
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    const helper = new JwtHelperService();
    this.loadToken();
    const isExpired = helper.isTokenExpired(this.authToken);
    return !isExpired;
  }

  storeUserData(token:string, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }
}
