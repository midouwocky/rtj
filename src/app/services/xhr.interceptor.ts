import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageUtil } from '../utils/storage.util';

export class XhrInterceptor implements HttpInterceptor {
    private cache = new Map<string, any>();

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = StorageUtil.getAuthToken();

        if (token) {
            // const decoded = this.jwtHelperService.decodeToken(token);

            const dateExp = new Date(0);
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

        return next.handle(request);

    }
}
