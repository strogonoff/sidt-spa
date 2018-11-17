import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bt-topbar',
  template: `
    <mat-toolbar>
      <mat-toolbar-row>
        <h1 class="title">
          Biotoken
        </h1>
        <span class="token-balance">
          <button mat-stroked-button>41 SIDT</button>
        </span>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styles: [`
    :host {
      margin-bottom: 1em;
    }
    mat-toolbar-row {
      display: flex;
      flex: row nowrap;
      align-items: center;
      justify-content: space-between;
    }
    .title {
      margin-right: 2em;
    }
    .token-balance {
      display: flex;
      flex: row nowrap;
      align-items: center;
    }
  `],
})
export class TopbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
