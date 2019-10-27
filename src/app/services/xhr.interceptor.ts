import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageUtil } from '../utils/storage.util';
import { AuthenticationService } from '../security/authentication.service';
import { RefreshToken } from '../shared/model/refresh-token.model';
import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class XhrInterceptor implements HttpInterceptor {
    private cache = new Map<string, any>();

    constructor(
        private authenticationService: AuthenticationService
    ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.url.includes(environment.endpoints.loginUrl)) {

            const token = StorageUtil.getAuthToken();

            if (token) {
                // const decoded = this.jwtHelperService.decodeToken(token);

                const authObject = StorageUtil.getAuthObject();
                const creadtedAt = authObject.created_at;
                const now = + new Date();
                if (now > (creadtedAt + 7200) * 1000) {
                    const refreshToken = authObject.refresh_token;
                    const refreTokenObject = new RefreshToken();
                    refreTokenObject.refresh_token = refreshToken;
                    this.authenticationService.authenticatedWithRefreshToken(refreTokenObject).subscribe(res => {
                        StorageUtil.setAuthObject(res);
                        this.authenticationService.setAutheneticated(true);

                    }, err => {
                        StorageUtil.removeAuthObject();
                        StorageUtil.removeAuthToken();
                        this.authenticationService.setAutheneticated(false);
                    });
                }
                // dateExp.setUTCSeconds(decoded.exp);
                // return date;

                // console.log('expiration token = ' + dateExp);

                // if (!(dateExp.valueOf() > new Date().valueOf())) {
                //     // token expired , Action : Logout
                //     // this.authService.logout2();
                // } else {
                // token not expired yet , Action : send the new header
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // }
            }

        }

        return next.handle(request);

    }
}
