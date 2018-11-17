import { Component } from '@angular/core';
import { AdalService } from 'adal-angular4';


@Component({
  selector: 'bt-root',
  template: `
    <bt-topbar></bt-topbar>
    <bt-stream-list></bt-stream-list>
  `,
  styles: [`
    :host {
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
    }
  `],
})
export class AppComponent {
  private adalConfig = {
    tenant: '11b2210f-a3ad-413c-b239-8be48126b4a6',
    clientId: '7abc1508-6c60-4b3a-8e24-ddd623894bd0',
    redirectUri: "http://sidt.dev.anton.strogonoff.name/",
    postLogoutRedirectUri: "http://sidt.dev.anton.strogonoff.name/auth",
    endpoints: {
      "": "7abc1508-6c60-4b3a-8e24-ddd623894bd0",
    },
  }
  constructor(private adal: AdalService) {
    this.adal.init(this.adalConfig);
  }
  signOut(): void {
    this.adal.logOut();
  }
}
