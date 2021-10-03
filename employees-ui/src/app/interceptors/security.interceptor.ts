import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, HttpErrorResponse, HttpResponse,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import { catchError, map, retry } from "rxjs/operators";


@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor (private router: Router) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    let clonedRequest = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    // const loginInfo = this.loginService.getLoginInfo();
    // if (loginInfo && loginInfo.authenticated) {
    //   clonedRequest = clonedRequest.clone({setHeaders: {'Authorization': loginInfo.authToken}});
    // }

    // this.loginService.setAuthExpire();

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 401) {
          // this.loginService.logout();
        }
        return throwError(error);
      })
    );
  }
}
