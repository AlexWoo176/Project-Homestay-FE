import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

// tslint:disable-next-line:typedef
declare function convertStringToArray(str);

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthenticationService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isLoggedIn()) {
      const roles = convertStringToArray(localStorage.getItem('roles'));
      for (const role of roles) {
        if (route.data.roles && route.data.roles.indexOf(role) !== -1) {
          return true;
        }
      }
      this.router.navigateByUrl('403');
      return false;
    }
    this.router.navigate(['login'], {queryParams: {redirectURL: state.url}});
    return false;
  }

}
