import { LangTranslateModule } from './../core/services/translate.module';
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
import { TranslateService } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
declare var userCountryCultureInfo: any;
declare var timeZoneOffset: any;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LangTranslateModule,
    BrowserAnimationsModule,
    KridaTvHeaderModule,
    AppRoutingModule
  ],
  providers: [WindowService, DateMethodsService, UrlConstants, ConstantsService, CommonMethodService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private dateMethodsService: DateMethodsService,
    private translate: TranslateService
  ) {
    dateMethodsService.setLocaleOffset(timeZoneOffset);
    dateMethodsService.setUserCountryCultureInfo(userCountryCultureInfo, userCountryCultureInfo);
  }
}
