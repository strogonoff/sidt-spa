import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bt-topbar',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <img class="logo" src="/assets/logo-white.png">
        <h1 class="title">
          Insurance Data Console
        </h1>
        <span class="token-balance">
          <button mat-stroked-button color="accent">41 SID tokens</button>
        </span>
        <span class="logout">
          <button mat-stroked-button (click)="signOut.emit(true)">Log out</button>
        </span>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styles: [`
    :host {
      margin-bottom: 1em;
      align-self: stretch;
    }
    .logo {
      height: 48px;
      margin-right: .5em;
    }
    mat-toolbar-row {
      display: flex;
      flex: row nowrap;
      align-items: center;
      justify-content: space-between;
    }
    .title {
      flex: 1;
      margin-right: 2em;
    }
    .token-balance {
      display: flex;
      flex: row nowrap;
      align-items: center;
      margin-right: 1em;
    }
  `],
})
export class TopbarComponent implements OnInit {
  @Output() signOut = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
