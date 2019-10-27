
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { StorageUtil } from '../utils/storage.util';
import { RefreshToken } from '../shared/model/refresh-token.model';
import { map } from 'rxjs/operators';

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
        const authObject = StorageUtil.getAuthObject();
        if (authObject) {
            const expirationTime = authObject.created_at;
            const now = + new Date();
            if (now > expirationTime) {
                this.authenticationService.setAutheneticated(false);
            }

            if (this.authenticationService.isAuthenticated()) {
                return true;
            } else {
                return this.getNewTokenWithRefreshToken();
            }
        } else {
            return false;
        }
    }


    getNewTokenWithRefreshToken(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const refreshToken = StorageUtil.getAuthObject().refresh_token;
        const refreTokenObject = new RefreshToken();
        refreTokenObject.refresh_token = refreshToken;
        this.authenticationService.authenticatedWithRefreshToken(refreTokenObject).subscribe(res => {
            StorageUtil.setAuthObject(res);
            this.authenticationService.setAutheneticated(true);
            return true;
        }, err => {
            return false;
        });
        return this.authenticationService.authenticatedWithRefreshToken(refreTokenObject).pipe(
            map(e => {
                if (e) {
                    return true;
                }
            })
        ).catch(() => {
            console.log('refresh token expired');
            return Observable.of(false);
        });
    }
}
