import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(private router:Router){ }
   
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('rol') === 'Admin'){
      return true;
    }
    this.router.navigate(['/'])
    return false;
  }
}