import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cridentials } from 'src/app/shared/model/cridentials.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticated = false;
  loginUrl = environment.endpoints.loginUrl;
  accountUrl = environment.endpoints.accountUrl;

  constructor(private http: HttpClient) { }

  /**
   * return if the user is authenticated
   */
  isAuthenticated(): boolean {
    return this.authenticated;
  }

  /**
   * set if the user is authenticated
   * @param auth the value of authentication
   */
  setAutheneticated(auth: boolean) {
    this.authenticated = auth;
  }

  /**
   * authenticate with cridentials
   * @param credentials
   */
  login(cridentials: Cridentials): Observable<any> {
    cridentials.grant_type = 'password';
    const req = this.loginUrl;
    // const req = 'http://young-scrubland-57448.herokuapp.com/spree_oauth/token';
    return this.http.post(req, cridentials);
  }
  
  /**
   * get the account 
   */
  getAccount(): Observable<any> {
    const req = this.accountUrl;
    // const req = 'http://young-scrubland-57448.herokuapp.com/api/v2/storefront/account';
    return this.http.get(req);
  }

}
