import { Component } from '@angular/core';

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
}
