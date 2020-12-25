import { CommonMethodService } from './../core/services/common-method.service';
import { ConstantsService } from './../core/services/constants.services';
import { UrlConstants } from './../core/services/url-constants.services';
import { DateMethodsService } from './../core/services/date.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KridaTvHeaderModule } from './ktv-header/ktv-header.module';
import { WindowService } from 'src/core/services/window-ref.service';
import { SharedTranslateModule } from 'src/core/services/translate.module';

declare var userCountryCultureInfo: any;
declare var timeZoneOffset: any;
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedTranslateModule,
    KridaTvHeaderModule,
    AppRoutingModule
  ],
  providers: [WindowService, DateMethodsService, UrlConstants, ConstantsService, CommonMethodService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private dateMethodsService: DateMethodsService
  ) {
    dateMethodsService.setLocaleOffset(timeZoneOffset);
    dateMethodsService.setUserCountryCultureInfo(userCountryCultureInfo, userCountryCultureInfo);
  }
}
