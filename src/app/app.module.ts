import { CommonMethodService } from './../core/services/common-method.service';
import { ConstantsService } from './../core/services/constants.services';
import { UrlConstants } from './../core/services/url-constants.services';
import { DateMethodsService } from './../core/services/date.service';
import { KridaTvHeaderComponent } from './ktv-header/ktv-header.component';
// import { KridaTvHeaderModule } from './ktv-header/ktv-header.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KridaTvHeaderModule } from './ktv-header/ktv-header.module';
import { WindowService } from 'src/core/services/window-ref.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KridaTvHeaderModule,
    AppRoutingModule
  ],
  providers: [WindowService, DateMethodsService, UrlConstants, ConstantsService, CommonMethodService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
