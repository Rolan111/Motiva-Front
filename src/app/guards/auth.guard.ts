import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorage} from "../storage/local-storage";
import {LocalStorageKeyEnum} from "../enums/enum";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  oLocalStorage = new LocalStorage();

  constructor(private router: Router) {
    // setInterval(()=>{
    //   // @ts-ignore
    //   this.canActivate()
    // },10000)
  }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.oLocalStorage.getItem(LocalStorageKeyEnum.token);

    if (token !== null) {
      return true;
    }

    return this.router.navigateByUrl('/login');
  }

}
