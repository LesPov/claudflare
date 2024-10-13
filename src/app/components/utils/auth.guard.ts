// src/app/utils/auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private sessionService: SessionService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    console.log('Checking token: ', token);

    if (!token) {
      console.log('No token found, redirecting to home...');
      this.router.navigate(['/home']);
      return false;
    }

    console.log('Token found, granting access...');
    this.sessionService.resetInactivityTimer();
    return true;
  }
}
