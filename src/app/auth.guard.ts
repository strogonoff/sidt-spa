import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AdalService } from 'adal-angular4';
import { DataService } from '@bt/data.service';

 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private adal: AdalService, private data: DataService) {}

  canActivate(): boolean {
    if (this.data.mock) { return true; }

    if (this.adal.userInfo.authenticated) {
      return true;
    }
    this.adal.login();
    return false;
  }
}
