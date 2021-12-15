import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.isAuthenticated) return true

      window.alert("You are not authenticated. Please sign in first.")
      this.router.navigate(['signin'])

      return false
  }

  // async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   let result: any = await this.auth.refreshToken().toPromise();
  //   console.log(result['success']);
  //   return result['success'];
  // }
  
}
