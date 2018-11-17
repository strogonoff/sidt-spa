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
    tenant: '[TENANT_GUID]',
    clientId: '[CLIENTID_GUID]',
    redirectUri: "[LOGIN_REDIRECT_URL]",
    postLogoutRedirectUri: "[POST_LOGOUT_REDIRECT_URL]",
    endpoints: {
      "[HOME_URL_WEB_API]": "[CLIENTID_WEB_API_GUID]",
    },
  }
  constructor(private adal: AdalService) {
    this.adal.init(this.adalConfig);
  }
  signOut(): void {
    this.adal.logOut();
  }
}
