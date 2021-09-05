import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AppResponse } from '../models/app-response';

@Injectable()
export class HttpErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof ErrorEvent) {
          // Client-side error        
          this.toastr.error(error.error.message);
          return throwError({ status: error.error, message: error.error.message } as AppResponse);
        } else {
          // Backend error          
          this.toastr.error(error.error);
          return throwError({ status: error.status, message: error.message } as AppResponse);
        }
      })
    );
  }
}
