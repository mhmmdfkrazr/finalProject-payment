import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.auth.getAuthorizationToken()
    console.log(authToken)
    request = request.clone({setHeaders: { 
      Authorization: `Bearer ${authToken}`
    }
  })

    return next.handle(request);

  }
}
