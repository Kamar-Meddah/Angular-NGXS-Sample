import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../auth.service';

@Injectable()
export class AdminGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const res = this.authService.checkIfAdmin();
    if (!res) {
      this.router.navigate(['login']);
    }
    return res;
  }

  canLoad(route: Route): boolean {
    const res = this.authService.checkIfAdmin();
    if (!res) {
      this.router.navigate(['login']);
    }
    return res;
  }
}
