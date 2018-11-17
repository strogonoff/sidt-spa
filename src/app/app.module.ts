import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StreamListComponent } from './stream-list/stream-list.component';
import { StreamDetailComponent } from './stream-detail/stream-detail.component';
import { StreamResultsetComponent } from './stream-resultset/stream-resultset.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BuyTokenComponent } from './buy-token/buy-token.component';


const appRoutes: Routes = [
  { path: 'streams', component: StreamListComponent },
  { path: 'streams/:sid', component: StreamDetailComponent },
  { path: 'streams/:sid/:rid', component: StreamResultsetComponent },
  { path: 'buy-token', component: BuyTokenComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    StreamListComponent,
    StreamDetailComponent,
    StreamResultsetComponent,
    PageNotFoundComponent,
    BuyTokenComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
