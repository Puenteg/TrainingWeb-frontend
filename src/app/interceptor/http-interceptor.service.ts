import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.info('Aplica Headers genericos', enviroment.urlFrontEnd)
    const reqClone = req.clone({withCredentials: true});
    reqClone.headers
      .append('Content-Type', 'application/json')
      .append('Origin', `${enviroment.urlFrontEnd}`)
      .append('Access-Control-Allow-Origin', `${enviroment.urlFrontEnd}`)
      .append('Access-Control-Allow-Credentials', 'true');

    return next.handle(reqClone).pipe(
      catchError((error) => {
        console.error(error)
        if(error.status === 401) {
          const errorMessage = error?.error?.message;
          alert(errorMessage)
          this.loginService.logOut();
          this.router.navigateByUrl('/')
          return throwError(() => errorMessage);
        } else {
          return throwError(() => error)
        }
      })
    );
  }
}
