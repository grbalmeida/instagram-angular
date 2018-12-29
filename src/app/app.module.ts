import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
