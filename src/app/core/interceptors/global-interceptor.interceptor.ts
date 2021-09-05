import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";

import { UserAuthenticationModel } from '../models/auth.model';
import { Router } from '@angular/router';


@Injectable()
export class GlobalInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = UserAuthenticationModel.loadCache()?.user.token;
    request = this.addTokenToRequest(request, token);
    return next.handle(request);
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      const status = this.checkLoginStatus(token);
      if (!status) {
        this.toastr.error(`La sesion ha expirado. <br> Favor de volver a loguearse.`);
        this.logout();
        return request;
      }

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  }

  private checkLoginStatus(token): boolean {

    if (token === null || token === undefined) {
      return false;
    }

    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return false;
    }

    const date = new Date(0);
    const tokenExpDate = date.setUTCSeconds(decoded?.exp);

    if (tokenExpDate.valueOf() > new Date().valueOf()) {
      return true;
    }

    return false;
  }

  logout(): void {
    UserAuthenticationModel.deleteCache();
    this.router.navigate(['login']).then();
  }

}
