import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import {provideHttpClient, withFetch} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideAnimations(),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
