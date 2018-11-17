import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AdalService } from 'adal-angular4';
 
@Component({
  selector: 'bt-auth-callback',
  template: ``,
  styles: [`
  `],
})
export class AuthCallbackComponent implements OnInit {
  constructor(private router: Router, private adal: AdalService, private _zone: NgZone) {}
  ngOnInit() {
    this.adal.handleWindowCallback();
 
    setTimeout(() => {
      this._zone.run(() => this.router.navigate(['/']));
    }, 200);
  }
}
