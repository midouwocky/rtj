
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // this.router.navigate(['home']);
        return this.authenticationService.isAuthenticated();
    }
}
