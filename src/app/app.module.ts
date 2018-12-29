import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import {AppComponent} from './app.component'
import {AccessComponent} from './access/access.component'
import {BannerComponent} from './access/banner/banner.component'
import {LoginComponent} from './access/login/login.component'
import {RegisterComponent} from './access/register/register.component'
@NgModule({
  declarations: [
    AppComponent,
    AccessComponent,
    BannerComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
