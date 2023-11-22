import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token');

    if (token)
    {
      const clonedRequest = request.clone({setHeaders: {Authorization : `Bearer ${token}`}})

      return next.handle(clonedRequest).pipe(
        tap(
          // here we're getting the response
          )
      );
    }
    else
    {
      return next.handle(request);
    }
  }
}
