import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/modules/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import et from '@angular/common/locales/et';
registerLocaleData(et);

import { AppRoutingModule } from '@app/modules/app-routing.module';
import { AppComponent } from '@app/app.component';
import { LoginComponent } from '@app/components/login/login.component';
import { JwtInterceptor } from '@app/services/jwt.interceptor';
import { ErrorInterceptor } from '@app/services/error.interceptor';
import { MenuComponent } from '@app/components/menu/menu.component';
import { NellieComponent } from '@app/components/nellie/nellie.component';
import { ResultsComponent } from '@app/components/results/results.component';
import { ContributeComponent } from './components/contribute/contribute.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NellieComponent,
    MenuComponent,
    ResultsComponent,
    ContributeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'et-EE' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
