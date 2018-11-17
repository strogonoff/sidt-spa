import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdalService, AdalInterceptor } from 'adal-angular4';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StreamListComponent } from './stream-list/stream-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BuyTokenComponent } from './buy-token/buy-token.component';
import { StreamRowComponent, DataRequestDialog } from './stream-list/stream-row.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AuthCallbackComponent } from './auth-callback.component';


const appRoutes: Routes = [
  { path: '', component: StreamListComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthCallbackComponent },
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
    DataRequestDialog,
    AuthCallbackComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
  ],
  providers: [
    AdalService,
    { provide: HTTP_INTERCEPTORS, useClass: AdalInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DataRequestDialog,
  ],
})
export class AppModule { }
