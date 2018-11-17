import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StreamListComponent } from './stream-list/stream-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BuyTokenComponent } from './buy-token/buy-token.component';
import { StreamRowComponent } from './stream-list/stream-row.component';
import { TopbarComponent } from './topbar/topbar.component';


const appRoutes: Routes = [
  { path: '', component: StreamListComponent },
  { path: 'buy-token', component: BuyTokenComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    StreamListComponent,
    PageNotFoundComponent,
    BuyTokenComponent,
    StreamRowComponent,
    TopbarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }),
    HttpClientModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
