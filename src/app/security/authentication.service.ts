import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticated = false;

  constructor(private http: HttpClient) { }

  /**
   * return if the user is authenticated
   */
  isAuthenticated(): boolean {
    return this.authenticated;
  }

}
